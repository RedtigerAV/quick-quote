import { createReducer, on } from '@ngrx/store';
import { IPhotosState } from './photos.state';
import * as photosActions from './photos.actions';
import { calculateCurrentPosition } from '../redux.helpers';

const initialState: IPhotosState = {
  photos: [],
  currentPosition: 0
};

export const photosReducer = createReducer(
  initialState,
  on(
    photosActions.loadPhotosSuccess,
    (state, { photos }): IPhotosState => ({ ...state, photos: [...state.photos, ...photos] })
  ),
  on(photosActions.selectPhoto, (state, { position }): IPhotosState => ({ ...state, currentPosition: position })),
  on(
    photosActions.removePhotos,
    (state, { startPosition, finishPosition }): IPhotosState => ({
      ...state,
      currentPosition: calculateCurrentPosition(state.currentPosition, startPosition, finishPosition),
      photos: state.photos.filter((_, index) => index < startPosition || index >= finishPosition)
    })
  )
);
