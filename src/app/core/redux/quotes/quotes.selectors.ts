import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IQuotesState } from './quotes.state';

const selectQuotesState = createFeatureSelector<IQuotesState>('quotes');

export const selectQuotes = createSelector(selectQuotesState, ({ quotes }) => quotes);
export const selectQuotesIDs = createSelector(selectQuotesState, ({ quotes }) => quotes.map(({ id }) => id));
export const selectCurrentPosition = createSelector(selectQuotesState, ({ currentPosition }) => currentPosition);
export const selectCurrentQuoteID = createSelector(
  selectQuotesIDs,
  selectCurrentPosition,
  (ids, position) => ids[position] || null
);
export const selectCurrentQuote = createSelector(
  selectQuotes,
  selectCurrentPosition,
  (quotes, position) => quotes[position] || null
);
export const selectNextQuote = createSelector(
  selectQuotes,
  selectCurrentPosition,
  (quotes, position) => quotes[position + 1] || null
);
export const selectPrevQuote = createSelector(
  selectQuotes,
  selectCurrentPosition,
  (quotes, position) => quotes[position - 1] || null
);
