import { createReducer, on } from '@ngrx/store';
import { IQuotesState } from './quotes.state';
import * as quotesActions from './quotes.actions';

const initialState: IQuotesState = {
  quotes: [],
  selectedQuoteID: null
};

export const quotesReducer = createReducer(
  initialState,
  on(
    quotesActions.loadQuoteSuccess,
    (state, { quote }): IQuotesState => ({ ...state, quotes: [...state.quotes, quote] })
  ),
  on(quotesActions.selectQuote, (state, { id }): IQuotesState => ({ ...state, selectedQuoteID: id }))
);
