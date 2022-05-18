import { filter, tap } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NextQuoteService } from './services/next-quote.service';
import { QuotesLoaderService } from './services/quotes-loader.service';

@UntilDestroy()
@Component({
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.scss']
})
export class QuotePageComponent implements OnInit {
  constructor(
    public readonly quotesFacade: QuotesFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly nextQuoteService: NextQuoteService,
    private readonly quotesLoaderService: QuotesLoaderService
  ) {}

  public ngOnInit(): void {
    this.quotesLoaderService.init();
    this.listenQuoteChanges();
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
