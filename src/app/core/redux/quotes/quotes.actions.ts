import { IQuote } from '@core/models/quote.model';
import { createAction, props } from '@ngrx/store';

const loadCurrentQuote = createAction('[quotes] [Command] Load current quote');
const loadCurrentQuoteByID = createAction('[quotes] [Command] Load current quote by ID', props<{ id: string }>());
const loadCurrentQuoteSuccess = createAction(
  '[quotes] [Query] Load current quote -> Success',
  props<{ quote: IQuote }>()
);
const loadCurrentQuoteFailure = createAction('[quotes] [Query] Load current quote -> Failure');
const loadNextQuote = createAction('[quotes] [Command] Load next quote');
const loadNextQuoteSuccess = createAction('[quotes] [Query] Load next quote -> Success', props<{ quote: IQuote }>());
const loadNextQuoteFailure = createAction('[quotes] [Query] Load next quote -> Failure');
const goToNextQuote = createAction('[quotes] [Command] Go to next quote');
