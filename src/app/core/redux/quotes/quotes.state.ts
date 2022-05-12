import { IQuote } from '@core/models/quote.model';
import { Nullable } from '@core/types/nullable.type';
import { RequestStatusEnum, RequestStatusType } from '@core/types/request-status.type';

export interface IQuoteState {
  quote: Nullable<IQuote>;
  status: RequestStatusType;
}

const initialQuoteState: IQuoteState = {
  quote: null,
  status: RequestStatusEnum.PENDING
};

// Loading nextQuote as a background proccess allow to improve
// the user experience on devices with slow connection
export interface IQuotesState {
  currentQuote: IQuoteState;
  nextQuote: IQuoteState;
}

export const initialState: IQuotesState = {
  currentQuote: initialQuoteState,
  nextQuote: initialQuoteState
};
