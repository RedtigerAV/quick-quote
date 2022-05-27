import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IFavouritesState } from './favourites.state';

const selectFavouritesState = createFeatureSelector<IFavouritesState>('favourites');

export const selectFavourites = createSelector(selectFavouritesState, ({ favourites }) => favourites);
export const selectFavouritesIDs = createSelector(selectFavouritesState, ({ favourites }) =>
  favourites.map(({ id }) => id)
);
export const selectFavouritesStatus = createSelector(selectFavouritesState, ({ status }) => status);
