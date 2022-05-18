import { Injectable } from '@angular/core';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';

@UntilDestroy()
@Injectable()
export class QuotesLoaderService {
  constructor(private readonly quotesFacade: QuotesFacade) {}

  public init(): void {
    this.quotesFacade.nextQuote$
      .pipe(
        filter(() => !!this.quotesFacade.selectedQuoteID),
        filter(nextQuote => !nextQuote),
        tap(() => this.quotesFacade.loadQuote()),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
