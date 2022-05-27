import {
  BehaviorSubject,
  catchError,
  combineLatest,
  delay,
  filter,
  finalize,
  map,
  Observable,
  of,
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

const ANIMATION_DELAY = 1000;

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
  changeDetection: ChangeDetectionStrategy.OnPush
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
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly nextQuoteService: NextQuoteService,
    private readonly previousQuoteService: PreviousQuoteService,
    private readonly quotesLoaderService: QuotesLoaderService,
    private readonly htmlToImage: HtmlToImageService
  ) {
    this.quotes$ = quotesFacade.quotes$;
    this.selectedQuote$ = quotesFacade.selectedQuote$;
    this.currentPosition$ = quotesFacade.currentQuotePosition$.pipe(filter(p => p !== null)) as Observable<number>;
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
    // TODO: проверить, может не нужно здесь делать init и load
    this.quotesLoaderService.init();
    this.favouritesFacade.loadFavourites();
    this.listenQuoteChanges();
  }

  @locker()
  public toPreviousQuote(): void {
    lock(this, this.toPreviousQuote);
    this.previousQuoteService.goToPreviousQuote();

    setTimeout(() => unlock(this, this.toPreviousQuote), ANIMATION_DELAY);
  }

  @locker()
  public toNextQuote(): void {
    lock(this, this.toNextQuote);

    combineLatest([this.nextQuoteService.goToNextQuote(), of(null).pipe(delay(ANIMATION_DELAY))])
      .pipe(
        take(1),
        // TODO: Обработать ошибку, если result === false
        tap(([result]) => {}),
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
        take(1),
        tap(dataUrl => FileSaver.saveAs(dataUrl, `${imageName}.${imageExtension}`)),
        // TODO: Обработать ошибку
        catchError(error => of(null)),
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
