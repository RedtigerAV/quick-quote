import { Injectable } from '@angular/core';
import { IMedia } from '@core/models/media.model';
import { IQuote } from '@core/models/quote.model';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { Nullable } from '@core/types/nullable.type';
import { BackgroundImageService } from '../background-image.service';

@Injectable({ providedIn: 'root' })
export class NextQuoteHelperService {
  constructor(private readonly quotesFacade: QuotesFacade, private readonly imagesService: BackgroundImageService) {}

  public get hasNextQuote(): boolean {
    return this.selectedQuoteIndex < this.quotesFacade.quotes.length - 1;
  }

  public get hasNextImage(): boolean {
    return this.selectedImageIndex < this.imagesService.imagesQueue.length - 1;
  }

  public get nextQuote(): Nullable<IQuote> {
    if (!this.hasNextQuote) {
      return null;
    }

    return this.quotesFacade.quotes[this.selectedQuoteIndex + 1];
  }

  public get nextImage(): Nullable<IMedia> {
    if (!this.hasNextImage) {
      return null;
    }

    return this.imagesService.imagesQueue[this.selectedImageIndex + 1];
  }

  private get selectedQuoteIndex(): number {
    return this.quotesFacade.quotesIDs.findIndex(id => id === this.quotesFacade.selectedQuoteID);
  }

  private get selectedImageIndex(): number {
    return this.imagesService.imagesQueue.findIndex(({ id }) => id === this.imagesService.selectedImageID);
  }
}
