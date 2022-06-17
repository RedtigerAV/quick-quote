import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPhotosState } from './photos.state';

const selectPhotosState = createFeatureSelector<IPhotosState>('photos');

export const selectPhotos = createSelector(selectPhotosState, ({ photos }) => photos);
export const selectPhotosIDs = createSelector(selectPhotos, photos => photos.map(({ id }) => id));
export const selectCurrentPhotoPosition = createSelector(selectPhotosState, ({ currentPosition }) => currentPosition);
export const selectCurrentPhotoID = createSelector(
  selectPhotosIDs,
  selectCurrentPhotoPosition,
  (photoIDs, position) => photoIDs[position] || null
);
export const selectCurrentPhoto = createSelector(
  selectPhotos,
  selectCurrentPhotoPosition,
  (photos, position) => photos[position] || null
);

export const selectNextPhoto = createSelector(
  selectPhotos,
  selectCurrentPhotoPosition,
  (photos, position) => photos[position + 1] || null
);

export const selectPrevPhoto = createSelector(
  selectPhotos,
  selectCurrentPhotoPosition,
  (photos, position) => photos[position - 1] || null
);
