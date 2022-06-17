import { Injectable } from '@angular/core';
import { PhotosFacade } from '@core/redux/photos/photos.facade';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';

@Injectable()
export class PreviousQuoteService {
  constructor(private readonly quotesFacade: QuotesFacade, private readonly photosFacade: PhotosFacade) {}

  public toPreviousQuote(): void {
    const quotePosition = this.quotesFacade.currentPosition;
    const photoPosition = this.photosFacade.selectedPhotoPosition;

    if (!!quotePosition) {
      this.quotesFacade.selectQuote(quotePosition - 1);
    }

    if (!!photoPosition) {
      this.photosFacade.selectPhoto(photoPosition - 1);
    }
  }
}
