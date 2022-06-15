import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IQuoteTopicsState } from './quote-topics.state';

const selectQuoteTopicsState = createFeatureSelector<IQuoteTopicsState>('quoteTopics');

export const selectAllTopics = createSelector(selectQuoteTopicsState, ({ topics }) => topics);
export const selectAllTopicsIDs = createSelector(selectAllTopics, topics => topics.map(({ id }) => id));
export const selectSelectedTopics = createSelector(selectQuoteTopicsState, ({ selectedTopics }) => selectedTopics);
export const selectStatus = createSelector(selectQuoteTopicsState, ({ status }) => status);
export const selectSelectedTopicsIDs = createSelector(selectSelectedTopics, topics => topics.map(({ id }) => id));
