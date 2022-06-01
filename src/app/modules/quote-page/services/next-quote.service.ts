import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { Injectable } from '@angular/core';
import { map, merge, Observable, of, take, tap } from 'rxjs';
import { MediaFacade } from '@core/redux/media/media.facade';

@Injectable()
export class NextQuoteService {
  constructor(private readonly quotesFacade: QuotesFacade, private readonly mediaFacade: MediaFacade) {}

  /**
   * Method to change quote and background image concurrently
   * @returns result of operation
   */
  public goToNextQuote(): Observable<boolean> {
    const currentPosition = this.quotesFacade.currentPosition;
    const total = this.quotesFacade.quotesTotal;

    if (currentPosition < total - 1) {
      this.quotesFacade.selectQuote(currentPosition + 1);
      this.checkAndHandleImageSelection();

      return of(true);
    }

    this.quotesFacade.loadQuote();

    return merge(
      this.quotesFacade.loadQuoteSuccessAction$.pipe(
        tap(() => this.quotesFacade.selectQuote(currentPosition + 1)),
        tap(() => this.checkAndHandleImageSelection()),
        map(() => true)
      ),
      this.quotesFacade.loadQuoteFailureAction$.pipe(map(() => false))
    ).pipe(take(1));
  }

  private checkAndHandleImageSelection(): void {
    if (!!this.mediaFacade.nextImage) {
      const { id } = this.mediaFacade.nextImage;

      this.mediaFacade.selectImage(id);
    } else {
      this.mediaFacade.loadImages();
    }
  }
}
