import { ActionReducerMap } from '@ngrx/store';
import { backgroundImagesReducer } from './background-images/background-images.reducer';
import { IState } from './index.state';
import { quotesReducer } from './quotes/quotes.reducer';

export const reducers: ActionReducerMap<IState> = {
  quotes: quotesReducer,
  backgroundImages: backgroundImagesReducer
};
