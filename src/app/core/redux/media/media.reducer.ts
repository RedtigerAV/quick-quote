import { createReducer, on } from '@ngrx/store';
import { IMediaState } from './media.state';
import * as mediaActions from './media.actions';

const initialState: IMediaState = {
  images: [],
  selectedImageID: null
};

export const mediaReducer = createReducer(
  initialState,
  on(
    mediaActions.loadImagesSuccess,
    (state, { images }): IMediaState => ({ ...state, images: [...state.images, ...images] })
  ),
  on(mediaActions.selectImage, (state, { id }): IMediaState => ({ ...state, selectedImageID: id }))
);
