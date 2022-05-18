import { IQuote } from '@core/models/quote.model';
import { Nullable } from '@core/types/nullable.type';

export interface IQuotesState {
  quotes: Array<IQuote>;
  selectedQuoteID: Nullable<string>;
}
