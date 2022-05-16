import { Nullable } from '@core/types/nullable.type';
import { EntityState } from '@ngrx/entity';
import { IQuote } from '@core/models/quote.model';

export interface IQuoteOrdered extends IQuote {
  order: number;
}

export interface IQuotesState extends EntityState<IQuoteOrdered> {
  selectedQuoteID: Nullable<string>;
}
