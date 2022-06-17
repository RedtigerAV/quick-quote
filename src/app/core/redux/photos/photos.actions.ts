import { IPhoto } from '@core/models/photo.model';
import { createAction, props } from '@ngrx/store';

export const loadPhotos = createAction('[photos] [Command] Load photos');
export const loadPhotosSuccess = createAction(
  '[photos] [Query] Load photos -> Success',
  props<{ photos: Array<IPhoto> }>()
);
export const loadPhotosFailure = createAction('[photos] [Query] Load photos -> Failure');
export const selectPhoto = createAction('[photos] [Command] Select photo', props<{ position: number }>());

// finish position is not included
export const removePhotos = createAction(
  '[photos] [Command] Remove photos',
  props<{ startPosition: number; finishPosition: number }>()
);
