import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { Injectable } from '@angular/core';
import { map, merge, take, tap } from 'rxjs';
import { PhotosFacade } from '@core/redux/photos/photos.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QuotesMediator, QuotesMediatorEvents } from './quotes.mediator';

@UntilDestroy()
@Injectable()
export class NextQuoteService {
  constructor(private readonly quotesFacade: QuotesFacade, private readonly photosFacade: PhotosFacade) {}

  /**
   * Method to change quote and background photo concurrently
   */
  public toNextQuote(): void {
    const currentPosition = this.quotesFacade.currentPosition;
    const total = this.quotesFacade.quotesTotal;

    if (currentPosition < total - 1) {
      this.quotesFacade.selectQuote(currentPosition + 1);
      this.checkAndHandlePhotoSelection();

      return;
    }

    this.quotesFacade.loadQuote();

    merge(
      this.quotesFacade.loadQuoteSuccessAction$.pipe(
        tap(() => this.quotesFacade.selectQuote(currentPosition + 1)),
        tap(() => this.checkAndHandlePhotoSelection()),
        map(() => void 0)
      ),
      this.quotesFacade.loadQuoteFailureAction$.pipe(
        tap(() => QuotesMediator.notify(QuotesMediatorEvents.TO_NEXT_QUOTE_ERROR))
      )
    )
      .pipe(take(1), untilDestroyed(this))
      .subscribe();
  }

  private checkAndHandlePhotoSelection(): void {
    const currentPosition = this.photosFacade.selectedPhotoPosition;
    const total = this.photosFacade.photos?.length;

    if (currentPosition < total - 1) {
      this.photosFacade.selectPhoto(currentPosition + 1);
    } else {
      this.photosFacade.loadPhotos();
    }
  }
}
