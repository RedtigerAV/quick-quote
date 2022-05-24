import { combineLatest, delay, EMPTY, filter, finalize, map, Observable, of, take, tap } from 'rxjs';
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

const ANIMATION_DELAY = 1500;

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
  public readonly isPreviousQuoteDisabled$: Observable<boolean>;

  constructor(
    public readonly viewport: ViewportService,
    private readonly quotesFacade: QuotesFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly nextQuoteService: NextQuoteService,
    private readonly previousQuoteService: PreviousQuoteService,
    private readonly quotesLoaderService: QuotesLoaderService
  ) {
    this.quotes$ = quotesFacade.quotes$;
    this.selectedQuote$ = quotesFacade.selectedQuote$;
    this.currentPosition$ = quotesFacade.currentQuotePosition$.pipe(filter(p => p !== null)) as Observable<number>;
    this.isFirstQuote$ = this.currentPosition$.pipe(map(position => !position));
    this.isPreviousQuoteDisabled$ = combineLatest([this.isFirstQuote$, isLocked$(this, this.onPreviousClick)]).pipe(
      map(([isFirst, isLocked]) => isFirst || isLocked)
    );
  }

  public ngOnInit(): void {
    this.quotesLoaderService.init();
    this.listenQuoteChanges();
  }

  @locker()
  public onPreviousClick(): void {
    lock(this, this.onPreviousClick);
    this.previousQuoteService.goToPreviousQuote();

    setTimeout(() => unlock(this, this.onPreviousClick), ANIMATION_DELAY);
  }

  @locker()
  public onNextClick(): void {
    lock(this, this.onNextClick);

    combineLatest([this.nextQuoteService.goToNextQuote(), of(null).pipe(delay(ANIMATION_DELAY))])
      .pipe(
        take(1),
        // TODO: Обработать ошибку, если result === false
        tap(([result]) => {}),
        finalize(() => unlock(this, this.onNextClick)),
        untilDestroyed(this)
      )
      .subscribe();
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
