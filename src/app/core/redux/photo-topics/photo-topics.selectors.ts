import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPhotoTopicsState } from './photo-topics.state';

const selectPhotoTopicsState = createFeatureSelector<IPhotoTopicsState>('photoTopics');

export const selectAllTopics = createSelector(selectPhotoTopicsState, ({ topics }) => topics);
export const selectAllTopicsIDs = createSelector(selectAllTopics, topics => topics.map(({ id }) => id));
export const selectSelectedTopics = createSelector(selectPhotoTopicsState, ({ selectedTopics }) => selectedTopics);
export const selectStatus = createSelector(selectPhotoTopicsState, ({ status }) => status);
export const selectSelectedTopicsIDs = createSelector(selectSelectedTopics, topics => topics.map(({ id }) => id));
