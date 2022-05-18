import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IQuotesState } from './quotes.state';

const selectQuotesState = createFeatureSelector<IQuotesState>('quotes');

export const selectQuotes = createSelector(selectQuotesState, ({ quotes }) => quotes);
export const selectQuotesIDs = createSelector(selectQuotesState, ({ quotes }) => quotes.map(({ id }) => id));
export const selectCurrentQuoteID = createSelector(selectQuotesState, ({ selectedQuoteID }) => selectedQuoteID);
export const selectCurrentQuote = createSelector(selectQuotes, selectCurrentQuoteID, (quotes, quoteID) =>
  !!quoteID ? quotes.find(({ id }) => id === quoteID) || null : null
);
export const selectCurrentQuotePosition = createSelector(selectQuotes, selectCurrentQuoteID, (quotes, quoteID) =>
  !!quoteID ? quotes.findIndex(({ id }) => id === quoteID) : null
);
export const selectNextQuote = createSelector(selectQuotes, selectCurrentQuotePosition, (quotes, position) =>
  position !== null ? quotes[position + 1] || null : null
);
export const selectPrevQuote = createSelector(selectQuotes, selectCurrentQuotePosition, (quotes, position) =>
  position !== null ? quotes[position - 1] || null : null
);
