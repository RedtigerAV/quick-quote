import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPhotosState } from './photos.state';

const selectPhotosState = createFeatureSelector<IPhotosState>('photos');

export const selectPhotos = createSelector(selectPhotosState, ({ photos }) => photos);
export const selectPhotosIDs = createSelector(selectPhotos, photos => photos.map(({ id }) => id));
export const selectCurrentPhotoID = createSelector(selectPhotosState, ({ selectedPhotoID }) => selectedPhotoID);
export const selectCurrentPhoto = createSelector(
  selectPhotos,
  selectCurrentPhotoID,
  (photos, photoID) => photos.find(({ id }) => id === photoID) || null
);
export const selectCurrentPhotoPosition = createSelector(selectPhotos, selectCurrentPhotoID, (photos, photoID) =>
  !!photoID ? photos.findIndex(({ id }) => id === photoID) : null
);
export const selectNextPhoto = createSelector(selectPhotos, selectCurrentPhotoPosition, (photos, position) =>
  position !== null ? photos[position + 1] || null : null
);
export const selectPrevPhoto = createSelector(selectPhotos, selectCurrentPhotoPosition, (photos, position) =>
  position !== null ? photos[position - 1] || null : null
);
