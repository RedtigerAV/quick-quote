import { createReducer, on } from '@ngrx/store';
import { IQuotesState } from './quotes.state';
import * as quotesActions from './quotes.actions';
import { calculateCurrentPosition } from '../redux.helpers';

const initialState: IQuotesState = {
  quotes: [],
  currentPosition: 0
};

export const quotesReducer = createReducer(
  initialState,
  on(
    quotesActions.loadQuoteSuccess,
    (state, { quote }): IQuotesState => ({ ...state, quotes: [...state.quotes, quote] })
  ),
  on(quotesActions.selectQuote, (state, { position }): IQuotesState => ({ ...state, currentPosition: position })),
  on(
    quotesActions.addQuote,
    (state, { quote, position }): IQuotesState => ({
      ...state,
      quotes: [...state.quotes.slice(0, position), quote, ...state.quotes.slice(position)]
    })
  ),
  on(
    quotesActions.removeQuotes,
    (state, { startPosition, finishPosition }): IQuotesState => ({
      ...state,
      currentPosition: calculateCurrentPosition(state.currentPosition, startPosition, finishPosition),
      quotes: state.quotes.filter((_, index) => index < startPosition || index >= finishPosition)
    })
  )
);
