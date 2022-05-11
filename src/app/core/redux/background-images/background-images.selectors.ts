import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBackgroundImagesState, IBackgroundImageState } from './background-images.state';

const selectBackgroundImagesState = createFeatureSelector<IBackgroundImagesState>('backgroundImages');

export const selectCurrentBackgroundImageState = createSelector(
  selectBackgroundImagesState,
  ({ currentImage }) => currentImage
);

export const selectNextBackgroundImageState = createSelector(selectBackgroundImagesState, ({ nextImage }) => nextImage);
