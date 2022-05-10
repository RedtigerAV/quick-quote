import { IMedia } from '@core/models/media.model';
import { createAction, props } from '@ngrx/store';

const loadCurrentBackgroundImage = createAction('[background-images] [Command] Load current background image');
const loadCurrentBackgroundImageSuccess = createAction(
  '[background-images] [Query] Load current background image -> Success',
  props<{ image: IMedia }>()
);
const loadCurrentBackgroundImageFailure = createAction(
  '[background-images] [Query] Load current background image -> Failure'
);
const loadNextBackgroundImage = createAction('[background-images] [Command] Load next background image');
const loadNextBackgroundImageSuccess = createAction(
  '[background-images] [Query] Load next background image -> Success',
  props<{ image: IMedia }>()
);
const loadNextBackgroundImageFailure = createAction(
  '[background-images] [Query] Load next background image -> Failure'
);
const goToNextBackgroundImage = createAction('[background-images] [Command] Go to next background image');
