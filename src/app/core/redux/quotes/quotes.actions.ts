import { IQuoteOrdered } from './quotes.state';
import { createAction, props } from '@ngrx/store';

export const loadRandomQuote = createAction('[quotes] [Command] Load random quote');
export const loadQuoteByID = createAction('[quotes] [Command] Load quote by ID', props<{ id: string }>());
export const loadQuoteSuccess = createAction(
  '[quotes] [Query] Load quote -> Success',
  props<{ quote: IQuoteOrdered }>()
);
export const loadQuoteFailure = createAction('[quotes] [Query] Load quote -> Failure');
export const selectQuote = createAction('[quotes] [Command] Select quote', props<{ id: string }>());
