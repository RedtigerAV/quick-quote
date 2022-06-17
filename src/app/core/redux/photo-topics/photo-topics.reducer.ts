import { RequestStatusEnum } from '@core/types/request-status.type';
import { createReducer, on } from '@ngrx/store';
import { IPhotoTopicsState } from './photo-topics.state';
import * as photoTopicsActions from './photo-topics.actions';

const initialState: IPhotoTopicsState = {
  topics: [],
  selectedTopics: [],
  status: RequestStatusEnum.PENDING
};

export const photoTopicsReducer = createReducer(
  initialState,
  on(
    photoTopicsActions.loadPhotoTopics,
    (state): IPhotoTopicsState => ({ ...state, status: RequestStatusEnum.LOADING })
  ),
  on(photoTopicsActions.loadPhotoTopicsSuccess, (state, { topics }): IPhotoTopicsState => ({ ...state, topics })),
  on(
    photoTopicsActions.loadPhotoTopicsFailure,
    (state): IPhotoTopicsState => ({ ...state, status: RequestStatusEnum.ERROR })
  ),
  on(
    photoTopicsActions.selectPhotoTopicsSuccess,
    (state, { selectedTopics }): IPhotoTopicsState => ({ ...state, selectedTopics, status: RequestStatusEnum.SUCCESS })
  )
);
