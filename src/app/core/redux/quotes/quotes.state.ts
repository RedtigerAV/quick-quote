import { IQuote } from '@core/models/quote.model';
import { Nullable } from '@core/types/nullable.type';
import { RequestStatusEnum, RequestStatusType } from '@core/types/request-status.type';

interface IQuoteState {
  quote: Nullable<IQuote>;
  status: RequestStatusType;
}

const initialQuoteState: IQuoteState = {
  quote: null,
  status: RequestStatusEnum.PENDING
};

export interface IQuotesState {
  currentQuote: IQuoteState;
  nextQuote: IQuoteState;
}

export const initialState: IQuotesState = {
  currentQuote: initialQuoteState,
  nextQuote: initialQuoteState
};
