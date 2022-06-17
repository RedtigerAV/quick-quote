import { IPhotoTopic } from '@core/models/photo-topic.model';
import { createAction, props } from '@ngrx/store';

export const loadPhotoTopics = createAction('[photo topics] [Command] Load photo topics');
export const loadPhotoTopicsSuccess = createAction(
  '[photo topics] [Query] Load photo topics -> Success',
  props<{ topics: Array<IPhotoTopic> }>()
);
export const loadPhotoTopicsFailure = createAction('[photo topics] [Query] Load photo topics -> Failure');
export const selectPhotoTopics = createAction(
  '[photo topics] [Command] Select photo topics',
  props<{ topicsIDsForSelection: Array<string> }>()
);
export const selectPhotoTopicsSuccess = createAction(
  '[photo topics] [Query] Select photo topics -> Success',
  props<{ selectedTopics: Array<IPhotoTopic> }>()
);
