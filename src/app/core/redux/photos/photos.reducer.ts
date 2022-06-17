import { createReducer, on } from '@ngrx/store';
import { IPhotosState } from './photos.state';
import * as photosActions from './photos.actions';

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
  on(photosActions.selectPhoto, (state, { position }): IPhotosState => ({ ...state, currentPosition: position }))
);
