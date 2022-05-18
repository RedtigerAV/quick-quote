import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { Injectable } from '@angular/core';
import { map, merge, Observable, of, take, tap } from 'rxjs';
import { MediaFacade } from '@core/redux/media/media.facade';

// TODO: Не должен дозагружать следуюшие цитаты и картинки - это не его обязанность
// TODO: убрать provideIn
@Injectable({ providedIn: 'root' })
export class NextQuoteService {
  constructor(private readonly quotesFacade: QuotesFacade, private readonly mediaFacade: MediaFacade) {}

  /**
   * Method to change quote and background image concurrently
   * @returns result of operation
   */
  public goToNextQuote(): Observable<boolean> {
    if (!!this.quotesFacade.nextQuote) {
      const { id } = this.quotesFacade.nextQuote;

      this.handleQuoteSelection(id);
      this.checkAndHandleImageSelection();

      return of(true);
    }

    this.quotesFacade.loadQuote();

    return merge(
      this.quotesFacade.loadQuoteSuccessAction$.pipe(
        tap(({ quote: { id } }) => this.handleQuoteSelection(id)),
        tap(() => this.checkAndHandleImageSelection()),
        map(() => true)
      ),
      this.quotesFacade.loadQuoteFailureAction$.pipe(map(() => false))
    ).pipe(take(1));
  }

  private handleQuoteSelection(quoteID: string): void {
    this.quotesFacade.selectQuote(quoteID);
    // TODO: убрать
    this.quotesFacade.loadQuote();
  }

  private checkAndHandleImageSelection(): void {
    if (!!this.mediaFacade.nextImage) {
      const { id } = this.mediaFacade.nextImage;

      this.mediaFacade.selectImage(id);
    }
  }
}
