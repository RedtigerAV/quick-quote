import { Injectable } from '@angular/core';
import { MediaFacade } from '@core/redux/media/media.facade';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';

@Injectable()
export class PreviousQuoteService {
  constructor(private readonly quotesFacade: QuotesFacade, private readonly mediaFacade: MediaFacade) {}

  public goToPreviousQuote(): void {
    const prevQuote = this.quotesFacade.prevQuote;
    const prevImage = this.mediaFacade.prevImage;

    if (!!prevQuote) {
      this.quotesFacade.selectQuote(prevQuote.id);
    }

    if (!!prevImage) {
      this.mediaFacade.selectImage(prevImage.id);
    }
  }
}
