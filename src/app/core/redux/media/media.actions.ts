import { IMedia } from '@core/models/media.model';
import { createAction, props } from '@ngrx/store';

export const loadImages = createAction('[meida] [Command] Load images');
export const loadImagesSuccess = createAction(
  '[media] [Query] Load images -> Success',
  props<{ images: Array<IMedia> }>()
);
export const loadImagesFailure = createAction('[media] [Query] Load images -> Failure');
export const selectImage = createAction('[media] [Command] Select image', props<{ id: string }>());
