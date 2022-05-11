import { createReducer, on } from '@ngrx/store';
import { IBackgroundImagesState, initialState } from './background-images.state';
import * as actions from './background-images.actions';
import { RequestStatusEnum } from '@core/types/request-status.type';

export const backgroundImagesReducer = createReducer<IBackgroundImagesState>(
  initialState,
  on(
    actions.loadCurrentBackgroundImage,
    (state, _): IBackgroundImagesState => ({
      ...state,
      currentImage: { image: null, status: RequestStatusEnum.LOADING }
    })
  ),
  on(
    actions.loadCurrentBackgroundImageSuccess,
    (state, { image }): IBackgroundImagesState => ({
      ...state,
      currentImage: { image, status: RequestStatusEnum.SUCCESS }
    })
  ),
  on(
    actions.loadCurrentBackgroundImageFailure,
    (state, _): IBackgroundImagesState => ({
      ...state,
      currentImage: { image: null, status: RequestStatusEnum.ERROR }
    })
  ),
  on(
    actions.goToNextBackgroundImage,
    (state, _): IBackgroundImagesState => ({
      // I don't think I should do some checks here.
      // checks must be executed before this action
      currentImage: { ...state.nextImage },
      nextImage: { image: null, status: RequestStatusEnum.PENDING }
    })
  ),
  on(
    actions.loadNextBackgroundImage,
    (state, _): IBackgroundImagesState => ({
      ...state,
      nextImage: { image: null, status: RequestStatusEnum.LOADING }
    })
  ),
  on(
    actions.loadNextBackgroundImageSuccess,
    (state, { image }): IBackgroundImagesState => ({
      ...state,
      nextImage: { image, status: RequestStatusEnum.SUCCESS }
    })
  ),
  on(
    actions.loadNextBackgroundImageFailure,
    (state, _): IBackgroundImagesState => ({
      ...state,
      nextImage: { image: null, status: RequestStatusEnum.ERROR }
    })
  )
);
