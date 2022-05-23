import { filter, Observable, tap } from 'rxjs';
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
  }

  public ngOnInit(): void {
    this.quotesLoaderService.init();
    this.listenQuoteChanges();
  }

  public onPreviousClick(): void {
    this.previousQuoteService.goToPreviousQuote();
  }

  public onNextClick(): void {
    this.nextQuoteService.goToNextQuote().pipe(untilDestroyed(this)).subscribe();
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
