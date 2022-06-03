import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  finalize,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap
} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NextQuoteService } from './services/next-quote.service';
import { QuotesLoaderService } from './services/quotes-loader.service';
import { Nullable } from '@core/types/nullable.type';
import { IQuote } from '@core/models/quote.model';
import { PreviousQuoteService } from './services/previous-quote.service';
import { ViewportService } from '@core/services/viewport/viewport.service';
import { isLocked$, lock, locker, unlock } from '@shared/decorators/locker.decorator';
import { HtmlToImageService } from '@shared/services/html-to-image.service';
import { globalConfig } from '@core/global/global.config';
import * as FileSaver from 'file-saver';
import { Platform } from '@angular/cdk/platform';
import { FavouritesFacade } from '@core/redux/favourites/favourites.facade';
import { SidebarService } from '@shared/services/sidebar/sidebar.service';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { AnimationProcessService } from '@core/services/animations/animation-process.service';
import { AnimationNameEnum } from '@core/services/animations/animations';
import { animationDone$ } from '@core/rxjs-operators/animation-process.operator';

enum ActionsStateEnum {
  MAIN = 'main',
  ADDITIONAL = 'additional',
  SOCIAL = 'social'
}
type ActionsStateType = ActionsStateEnum.MAIN | ActionsStateEnum.ADDITIONAL | ActionsStateEnum.SOCIAL;

@UntilDestroy()
@Component({
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [QuotesLoaderService]
})
export class QuotePageComponent implements OnInit {
  public readonly quotes$: Observable<Array<IQuote>>;
  public readonly selectedQuote$: Observable<Nullable<IQuote>>;
  public readonly currentPosition$: Observable<number>;
  public readonly isFirstQuote$: Observable<boolean>;
  public readonly isSelectedFavourite$: Observable<boolean>;
  public readonly isPreviousQuoteDisabled$: Observable<boolean>;
  public readonly skipHtmlToImageClass = globalConfig.skipHtmlToImageClass;
  public readonly actionsStateEnum = ActionsStateEnum;
  public readonly actionsState$: Observable<ActionsStateType>;
  private readonly _actionsState$: BehaviorSubject<ActionsStateType>;

  constructor(
    public readonly platform: Platform,
    public readonly viewport: ViewportService,
    public readonly favouritesFacade: FavouritesFacade,
    private readonly quotesFacade: QuotesFacade,
    private readonly animationProcess: AnimationProcessService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly nextQuoteService: NextQuoteService,
    private readonly previousQuoteService: PreviousQuoteService,
    private readonly quotesLoaderService: QuotesLoaderService,
    private readonly htmlToImage: HtmlToImageService,
    private readonly sidebarService: SidebarService
  ) {
    this.quotes$ = quotesFacade.quotes$;
    this.selectedQuote$ = quotesFacade.selectedQuote$;
    this.currentPosition$ = quotesFacade.currentPosition$.pipe(filter(p => p !== null)) as Observable<number>;
    this.isFirstQuote$ = this.currentPosition$.pipe(map(position => !position));
    this.isPreviousQuoteDisabled$ = combineLatest([this.isFirstQuote$, isLocked$(this, this.toPreviousQuote)]).pipe(
      map(([isFirst, isLocked]) => isFirst || isLocked)
    );
    this.isSelectedFavourite$ = combineLatest([quotesFacade.selectedQuoteID$, favouritesFacade.favouritesIDs$]).pipe(
      map(([selectedQuoteID, favouritesIDs]) => (selectedQuoteID ? favouritesIDs.includes(selectedQuoteID) : false))
    );
    this._actionsState$ = new BehaviorSubject<ActionsStateType>(ActionsStateEnum.MAIN);
    this.actionsState$ = this._actionsState$.asObservable();
  }

  public ngOnInit(): void {
    this.quotesLoaderService.init();
    this.listenQuoteChanges();
  }

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

    this.nextQuoteService
      .goToNextQuote()
      .pipe(
        // TODO: Обработать ошибку, если result === false
        tap(result => {}),
        switchMap(result =>
          result ? animationDone$(AnimationNameEnum.IMAGE_CHANGE, AnimationNameEnum.QUOTE_CHANGE) : of()
        ),
        take(1),
        finalize(() => unlock(this, this.toNextQuote)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  @locker()
  public convertToImage(): void {
    lock(this, this.convertToImage);

    const filter: (node: HTMLElement) => boolean = node => !node.classList?.contains(globalConfig.skipHtmlToImageClass);
    const imageName = `[Quick Quote] ${this.quotesFacade.selectedQuote?.authorName}`;
    const imageExtension = 'jpeg';

    this.htmlToImage
      .toJpeg(filter)
      .pipe(
        tap(dataUrl => FileSaver.saveAs(dataUrl, `${imageName}.${imageExtension}`)),
        // TODO: Обработать ошибку
        catchError(error => of(null)),
        take(1),
        finalize(() => unlock(this, this.convertToImage)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public openBookmarks(): void {
    this.sidebarService
      .open({ content: BookmarksComponent })
      .afterClosed()
      .pipe(take(1), filter(Boolean), untilDestroyed(this))
      .subscribe(result => {
        const isEqual = result.id === this.quotesFacade.selectedQuoteID;
        const isNextEqual = result.id === this.quotesFacade.nextQuote?.id;

        if (isNextEqual) {
          this.nextQuoteService.goToNextQuote();
        } else if (!isEqual) {
          this.quotesFacade.addQuote(result, this.quotesFacade.currentPosition + 1);

          setTimeout(() => this.nextQuoteService.goToNextQuote(), 0);
        }
      });
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
