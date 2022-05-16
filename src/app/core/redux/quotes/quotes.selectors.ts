import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter } from './quotes.adapter';
import { IQuotesState } from './quotes.state';

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

const selectQuotesState = createFeatureSelector<IQuotesState>('quotes');

export const selectQuotesIDs = createSelector(selectQuotesState, selectIds);
export const selectQuotesEntities = createSelector(selectQuotesState, selectEntities);
export const selectAllQuotes = createSelector(selectQuotesState, selectAll);
export const selectQuotesTotal = createSelector(selectQuotesState, selectTotal);
export const selectCurrentQuoteID = createSelector(selectQuotesState, ({ selectedQuoteID }) => selectedQuoteID);
export const selectCurrentQuote = createSelector(
  selectQuotesEntities,
  selectCurrentQuoteID,
  (quotesEntities, quoteID) => (!!quoteID ? quotesEntities[quoteID] || null : null)
);
