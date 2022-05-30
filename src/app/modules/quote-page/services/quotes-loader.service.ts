import { Injectable } from '@angular/core';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';

@UntilDestroy()
@Injectable()
export class QuotesLoaderService {
  constructor(private readonly quotesFacade: QuotesFacade) {}

  public init(): void {
    this.quotesFacade.currentPosition$
      .pipe(
        filter(() => !!this.quotesFacade.selectedQuoteID),
        filter(position => position === this.quotesFacade.quotesTotal - 1),
        tap(() => this.quotesFacade.loadQuote()),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
