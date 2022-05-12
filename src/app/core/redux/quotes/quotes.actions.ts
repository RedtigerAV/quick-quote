import { IQuote } from '@core/models/quote.model';
import { createAction, props } from '@ngrx/store';

export const loadCurrentQuote = createAction('[quotes] [Command] Load current quote');
export const loadCurrentQuoteByID = createAction(
  '[quotes] [Command] Load current quote by ID',
  props<{ id: string }>()
);
export const loadCurrentQuoteSuccess = createAction(
  '[quotes] [Query] Load current quote -> Success',
  props<{ quote: IQuote }>()
);
export const loadCurrentQuoteFailure = createAction('[quotes] [Query] Load current quote -> Failure');
export const loadNextQuote = createAction('[quotes] [Command] Load next quote');
export const loadNextQuoteSuccess = createAction(
  '[quotes] [Query] Load next quote -> Success',
  props<{ quote: IQuote }>()
);
export const loadNextQuoteFailure = createAction('[quotes] [Query] Load next quote -> Failure');
export const goToNextQuote = createAction('[quotes] [Command] Go to next quote');
