import { createReducer, on } from '@ngrx/store';
import { IPhotosState } from './photos.state';
import * as photosActions from './photos.actions';

const initialState: IPhotosState = {
  photos: [],
  selectedPhotoID: null
};

export const photosReducer = createReducer(
  initialState,
  on(
    photosActions.loadPhotosSuccess,
    (state, { photos }): IPhotosState => ({ ...state, photos: [...state.photos, ...photos] })
  ),
  on(photosActions.selectPhoto, (state, { id }): IPhotosState => ({ ...state, selectedPhotoID: id }))
);
