import { Injectable } from '@angular/core';
import { PhotosFacade } from '@core/redux/photo/photos.facade';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';

@Injectable()
export class PreviousQuoteService {
  constructor(private readonly quotesFacade: QuotesFacade, private readonly photosFacade: PhotosFacade) {}

  public toPreviousQuote(): void {
    const quotePosition = this.quotesFacade.currentPosition;
    const prevPhoto = this.photosFacade.prevPhoto;

    if (!!quotePosition) {
      this.quotesFacade.selectQuote(quotePosition - 1);
    }

    if (!!prevPhoto) {
      this.photosFacade.selectPhotos(prevPhoto.id);
    }
  }
}
