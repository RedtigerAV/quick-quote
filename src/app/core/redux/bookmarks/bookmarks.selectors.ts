import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBookmarksState } from './bookmarks.state';

const selectBookmarksState = createFeatureSelector<IBookmarksState>('bookmarks');

export const selectBookmarks = createSelector(selectBookmarksState, ({ bookmarks }) => bookmarks);
export const selectBookmarksIDs = createSelector(selectBookmarksState, ({ bookmarks }) =>
  bookmarks.map(({ id }) => id)
);
export const selectBookmarksStatus = createSelector(selectBookmarksState, ({ status }) => status);
