import { createReducer, on } from '@ngrx/store';
import { adapter } from './quotes.adapter';
import { IQuotesState } from './quotes.state';
import * as quotesActions from './quotes.actions';

export const initialState: IQuotesState = adapter.getInitialState({
  selectedQuoteID: null
});

export const quotesReducer = createReducer(
  initialState,
  on(quotesActions.loadQuoteSuccess, (state, { quote }): IQuotesState => adapter.addOne(quote, state)),
  on(quotesActions.selectQuote, (state, { id }): IQuotesState => ({ ...state, selectedQuoteID: id }))
);
