import { BehaviorSubject, catchError, combineLatest, filter, finalize, map, Observable, of, take, tap } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NextQuoteService } from './services/next-quote.service';
import { QuotesLoaderService } from './services/quotes-loader.service';
import { PreviousQuoteService } from './services/previous-quote.service';
import { ViewportService } from '@core/services/viewport/viewport.service';
import { lock, locker, unlock } from '@shared/decorators/locker.decorator';
import { HtmlToImageService } from '@core/services/html-to-image/html-to-image.service';
import { Platform } from '@angular/cdk/platform';
import { BookmarksFacade } from '@core/redux/bookmarks/bookmarks.facade';
import { AnimationProcessService } from '@core/services/animations/animation-process.service';
import { AnimationNameEnum } from '@core/services/animations/animations';
import { DownloadPhotoService } from './services/dowload-photo.service';
import { BookmarksService } from './services/bookmarks.service';
import { ActionsStateEnum, ActionsStateType } from './quote-page.interfaces';
import { SlideshowService, SlidwshowStateEnum } from './services/slideshow.service';
import { QuotesMediator, QuotesMediatorEvents } from './services/quotes.mediator';
import { AnimationEvent } from '@angular/animations';
import isNumber from 'lodash-es/isNumber';
import { SettingsService } from './services/settings.service';

@UntilDestroy()
@Component({
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    QuotesMediator,
    NextQuoteService,
    PreviousQuoteService,
    QuotesLoaderService,
    DownloadPhotoService,
    BookmarksService,
    SlideshowService,
    SettingsService
  ]
})
export class QuotePageComponent implements OnInit {
  public readonly isPreviousButtonDisabled$: Observable<boolean>;
  public readonly isNextButtonDisabled$: Observable<boolean>;
  public readonly actionsState$: Observable<ActionsStateType>;
  public readonly inSlideshowMode$: Observable<boolean>;
  public readonly skipHtmlToImageClass = HtmlToImageService.skipHtmlToImageClass;
  public readonly actionsStateEnum = ActionsStateEnum;
  public readonly quotesEventsEnum = QuotesMediatorEvents;
  private readonly _actionsState$ = new BehaviorSubject<ActionsStateType>(ActionsStateEnum.MAIN);
  private readonly _isPreviousButtonDisabled$ = new BehaviorSubject<boolean>(false);
  private readonly _isNextButtonDisabled$ = new BehaviorSubject<boolean>(false);

  constructor(
    public readonly platform: Platform,
    public readonly viewport: ViewportService,
    public readonly bookmarksFacade: BookmarksFacade,
    public readonly bookmarksService: BookmarksService,
    public readonly quotesFacade: QuotesFacade,
    public readonly slideshowService: SlideshowService,
    public readonly quotesMediator: QuotesMediator,
    public readonly settingsService: SettingsService,
    private readonly animationProcess: AnimationProcessService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly quotesLoaderService: QuotesLoaderService,
    private readonly htmlToImageService: HtmlToImageService,
    private readonly downloadPhotoService: DownloadPhotoService
  ) {
    this.quotesMediator.hostComponent = this;

    this.inSlideshowMode$ = slideshowService.state$.pipe(map(state => state === SlidwshowStateEnum.STARTED));
    this.actionsState$ = this._actionsState$.asObservable();
    this.isNextButtonDisabled$ = this._isNextButtonDisabled$.asObservable();
    this.isPreviousButtonDisabled$ = combineLatest([
      quotesFacade.currentPosition$.pipe(map(position => !position)),
      this._isPreviousButtonDisabled$.asObservable()
    ]).pipe(map(([isFirst, isDisabled]) => isFirst || isDisabled));
  }

  public ngOnInit(): void {
    this.quotesLoaderService.init();
    this.listenQuoteChanges();
  }

  public animationStart(): void {
    this.animationProcess.animationStart(AnimationNameEnum.QUOTE_CHANGE);
  }

  public animationDone(event: AnimationEvent): void {
    const isNumbers = isNumber(event.fromState) && isNumber(event.toState);

    if (isNumbers) {
      QuotesMediator.notify(
        event.fromState < event.toState
          ? QuotesMediatorEvents.TO_NEXT_QUOTE_FINISH
          : QuotesMediatorEvents.TO_PREVIOUS_QUOTE_FINISH
      );
    }

    this.animationProcess.animationDone(AnimationNameEnum.QUOTE_CHANGE);
  }

  public setNextButtonDisabledState(disabled: boolean): void {
    disabled ? lock(this, this.toNextQuote) : unlock(this, this.toNextQuote);

    this._isNextButtonDisabled$.next(disabled);
  }

  public setPreviousButtonDisabledState(disabled: boolean): void {
    disabled ? lock(this, this.toPreviousQuote) : unlock(this, this.toPreviousQuote);

    this._isPreviousButtonDisabled$.next(disabled);
  }

  @locker()
  @HostListener('document:keyup.arrowright')
  public toNextQuote(): void {
    QuotesMediator.notify(QuotesMediatorEvents.TO_NEXT_QUOTE);
  }

  @locker()
  @HostListener('document:keyup.arrowleft')
  public toPreviousQuote(): void {
    QuotesMediator.notify(QuotesMediatorEvents.TO_PREVIOUS_QUOTE);
  }

  @locker()
  public convertToImage(): void {
    lock(this, this.convertToImage);
    const imageName = `[Quick Quote] ${this.quotesFacade.selectedQuote?.authorName}`;

    // https://help.unsplash.com/en/articles/2511258-guideline-triggering-a-download
    this.downloadPhotoService.triggerDownload();

    this.htmlToImageService
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
