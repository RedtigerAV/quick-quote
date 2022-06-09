import { Injectable } from '@angular/core';
import { MediaFacade } from '@core/redux/media/media.facade';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';

@Injectable()
export class PreviousQuoteService {
  constructor(private readonly quotesFacade: QuotesFacade, private readonly mediaFacade: MediaFacade) {}

  public toPreviousQuote(): void {
    const quotePosition = this.quotesFacade.currentPosition;
    const prevImage = this.mediaFacade.prevImage;

    if (!!quotePosition) {
      this.quotesFacade.selectQuote(quotePosition - 1);
    }

    if (!!prevImage) {
      this.mediaFacade.selectImage(prevImage.id);
    }
  }
}
