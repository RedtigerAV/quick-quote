import { BehaviorSubject, catchError, combineLatest, filter, finalize, map, Observable, of, take, tap } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NextQuoteService } from './services/next-quote.service';
import { QuotesLoaderService } from './services/quotes-loader.service';
import { PreviousQuoteService } from './services/previous-quote.service';
import { ViewportService } from '@core/services/viewport/viewport.service';
import { isLocked$, lock, locker, unlock } from '@shared/decorators/locker.decorator';
import { HtmlToImageService } from '@core/services/html-to-image/html-to-image.service';
import { Platform } from '@angular/cdk/platform';
import { BookmarksFacade } from '@core/redux/bookmarks/bookmarks.facade';
import { AnimationProcessService } from '@core/services/animations/animation-process.service';
import { AnimationNameEnum } from '@core/services/animations/animations';
import { DownloadImageService } from './services/dowload-image.service';
import { Timer } from '@shared/models/timer';
import { BookmarksService } from './services/bookmarks.service';
import { ActionsStateEnum, ActionsStateType } from './quote-page.interfaces';
import { animationDone$, waitUntilAnimationDone } from '@core/rxjs-operators/animation-process.operator';

@UntilDestroy()
@Component({
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NextQuoteService, PreviousQuoteService, QuotesLoaderService, DownloadImageService, BookmarksService]
})
export class QuotePageComponent implements OnInit, OnDestroy {
  public readonly isPreviousQuoteDisabled$: Observable<boolean>;
  public readonly isNextQuoteDisabled$: Observable<boolean>;
  public readonly skipHtmlToImageClass = HtmlToImageService.skipHtmlToImageClass;
  public readonly actionsStateEnum = ActionsStateEnum;
  public readonly actionsState$: Observable<ActionsStateType>;
  public readonly timer = new Timer({ seconds: 6 });
  public readonly inSlideshowMode$: Observable<boolean>;
  private readonly _actionsState$ = new BehaviorSubject<ActionsStateType>(ActionsStateEnum.MAIN);
  private readonly _inSlideshowMode$ = new BehaviorSubject(false);

  constructor(
    public readonly platform: Platform,
    public readonly viewport: ViewportService,
    public readonly bookmarksFacade: BookmarksFacade,
    public readonly bookmarksService: BookmarksService,
    public readonly quotesFacade: QuotesFacade,
    private readonly animationProcess: AnimationProcessService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly nextQuoteService: NextQuoteService,
    private readonly previousQuoteService: PreviousQuoteService,
    private readonly quotesLoaderService: QuotesLoaderService,
    private readonly htmlToImage: HtmlToImageService,
    private readonly downloadImage: DownloadImageService
  ) {
    this.actionsState$ = this._actionsState$.asObservable();
    this.inSlideshowMode$ = this._inSlideshowMode$.asObservable();

    this.isPreviousQuoteDisabled$ = combineLatest([
      quotesFacade.currentPosition$.pipe(map(position => !position)),
      isLocked$(this, this.toPreviousQuote)
    ]).pipe(map(([isFirst, isLocked]) => isFirst || isLocked));

    this.isNextQuoteDisabled$ = isLocked$(this, this.toNextQuote);
  }

  public ngOnInit(): void {
    this.quotesLoaderService.init();
    this.listenQuoteChanges();
  }

  public ngOnDestroy(): void {}

  public animationStart(): void {
    this.animationProcess.animationStart(AnimationNameEnum.QUOTE_CHANGE);
  }

  public animationDone(): void {
    this.animationProcess.animationDone(AnimationNameEnum.QUOTE_CHANGE);
  }

  @locker()
  public toPreviousQuote(): void {
    lock(this, this.toPreviousQuote);

    this.previousQuoteService.goToPreviousQuote();

    animationDone$(AnimationNameEnum.IMAGE_CHANGE, AnimationNameEnum.QUOTE_CHANGE)
      .pipe(
        take(1),
        finalize(() => unlock(this, this.toPreviousQuote)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  @locker()
  public toNextQuote(): void {
    lock(this, this.toNextQuote);

    // TODO: Обработать ошибку
    this.nextQuoteService
      .goToNextQuote()
      .pipe(
        waitUntilAnimationDone(AnimationNameEnum.IMAGE_CHANGE, AnimationNameEnum.QUOTE_CHANGE),
        finalize(() => unlock(this, this.toNextQuote)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  @locker()
  public convertToImage(): void {
    lock(this, this.convertToImage);
    const imageName = `[Quick Quote] ${this.quotesFacade.selectedQuote?.authorName}`;

    // https://help.unsplash.com/en/articles/2511258-guideline-triggering-a-download
    this.downloadImage.triggerDownload();

    this.htmlToImage
      .saveImage(imageName)
      .pipe(
        // TODO: Обработать ошибку
        catchError(error => of(null)),
        take(1),
        finalize(() => unlock(this, this.convertToImage)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public runSlideshow(): void {
    this._inSlideshowMode$.next(true);
    this.toNextQuote();
  }

  public stopSlideshow(): void {
    this._inSlideshowMode$.next(false);
    this.timer.reset();
  }

  public switchBottomBarState(state: ActionsStateType): void {
    this._actionsState$.next(state);
  }

  private listenQuoteChanges(): void {
    this.quotesFacade.selectedQuoteID$
      .pipe(
        filter(Boolean),
        tap(id => this.updateQueryParams(id)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private updateQueryParams(quoteID: string): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { quote: quoteID },
      replaceUrl: true,
      queryParamsHandling: 'merge'
    });
  }
}
