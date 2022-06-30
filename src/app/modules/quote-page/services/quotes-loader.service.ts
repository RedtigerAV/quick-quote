import { Injectable } from '@angular/core';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { waitUntilAnimationDone } from '@core/rxjs-operators/animation-process.operator';
import { AnimationNameEnum } from '@core/services/animations/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';

/**
 * Service to automatically download quotes when needed
 */
@UntilDestroy()
@Injectable()
export class QuotesLoaderService {
  constructor(private readonly quotesFacade: QuotesFacade) {}

  public init(): void {
    // Loading next quote after moving to the next
    this.quotesFacade.currentPosition$
      .pipe(
        filter(() => !!this.quotesFacade.selectedQuoteID),
        filter(position => position === this.quotesFacade.quotesTotal - 1),
        waitUntilAnimationDone(AnimationNameEnum.PHOTO_CHANGE, AnimationNameEnum.QUOTE_CHANGE),
        tap(() => this.quotesFacade.loadQuote()),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
