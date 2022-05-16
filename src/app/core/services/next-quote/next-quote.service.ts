import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { Injectable } from '@angular/core';
import { BackgroundImageService } from '../background-image.service';
import { map, merge, Observable, of, take, tap } from 'rxjs';
import { NextQuoteHelperService } from './next-quote-helper.service';
import { IQuote } from '@core/models/quote.model';
import { IMedia } from '@core/models/media.model';

@Injectable({ providedIn: 'root' })
export class NextQuoteService {
  constructor(
    private readonly quotesFacade: QuotesFacade,
    private readonly imagesService: BackgroundImageService,
    private readonly nextQuoteHelper: NextQuoteHelperService
  ) {}

  /**
   * Method to change quote and background image concurrently
   * @returns result of operation
   */
  public goToNextQuote(): Observable<boolean> {
    if (this.nextQuoteHelper.hasNextQuote) {
      const { id } = this.nextQuoteHelper.nextQuote as IQuote;

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
    this.quotesFacade.loadQuote();
  }

  private checkAndHandleImageSelection(): void {
    if (this.nextQuoteHelper.hasNextImage) {
      const { id } = this.nextQuoteHelper.nextImage as IMedia;

      this.imagesService.selectImage(id);
    }

    this.imagesService.loadImage();
  }
}
