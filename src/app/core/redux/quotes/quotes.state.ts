import { IQuote } from '@core/models/quote.model';

export interface IQuotesState {
  // Quotes in this array may be repeated to hold history, therefore use currentPosition
  quotes: Array<IQuote>;
  currentPosition: number;
}
