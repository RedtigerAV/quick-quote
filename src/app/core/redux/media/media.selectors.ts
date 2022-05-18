import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMediaState } from './media.state';

const selectMediaState = createFeatureSelector<IMediaState>('media');

export const selectImages = createSelector(selectMediaState, ({ images }) => images);
export const selectImagesIDs = createSelector(selectImages, images => images.map(({ id }) => id));
export const selectCurrentImageID = createSelector(selectMediaState, ({ selectedImageID }) => selectedImageID);
export const selectCurrentImage = createSelector(
  selectImages,
  selectCurrentImageID,
  (images, imageID) => images.find(({ id }) => id === imageID) || null
);
export const selectCurrentImagePosition = createSelector(selectImages, selectCurrentImageID, (images, imageID) =>
  !!imageID ? images.findIndex(({ id }) => id === imageID) : null
);
export const selectNextImage = createSelector(selectImages, selectCurrentImagePosition, (images, position) =>
  position !== null ? images[position + 1] || null : null
);
export const selectPrevImage = createSelector(selectImages, selectCurrentImagePosition, (images, position) =>
  position !== null ? images[position - 1] || null : null
);
