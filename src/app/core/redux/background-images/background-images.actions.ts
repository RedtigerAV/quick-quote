import { IMedia } from '@core/models/media.model';
import { createAction, props } from '@ngrx/store';

export const loadCurrentBackgroundImage = createAction('[background-images] [Command] Load current background image');
export const loadCurrentBackgroundImageSuccess = createAction(
  '[background-images] [Query] Load current background image -> Success',
  props<{ image: IMedia }>()
);
export const loadCurrentBackgroundImageFailure = createAction(
  '[background-images] [Query] Load current background image -> Failure'
);
export const loadNextBackgroundImage = createAction('[background-images] [Command] Load next background image');
export const loadNextBackgroundImageSuccess = createAction(
  '[background-images] [Query] Load next background image -> Success',
  props<{ image: IMedia }>()
);
export const loadNextBackgroundImageFailure = createAction(
  '[background-images] [Query] Load next background image -> Failure'
);
export const goToNextBackgroundImage = createAction('[background-images] [Command] Go to next background image');
