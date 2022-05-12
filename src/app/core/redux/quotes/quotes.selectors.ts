import { IQuotesState } from './quotes.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectQuotesStateSelector = createFeatureSelector<IQuotesState>('quotes');

export const selectCurrentQuoteState = createSelector(selectQuotesStateSelector, ({ currentQuote }) => currentQuote);
export const selectNextQuoteState = createSelector(selectQuotesStateSelector, ({ nextQuote }) => nextQuote);
