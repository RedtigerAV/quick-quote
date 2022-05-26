import { ActionReducerMap } from '@ngrx/store';
import { favouritesReducer } from './favourites/favourites.reducer';
import { IState } from './index.state';
import { mediaReducer } from './media/media.reducer';
import { quotesReducer } from './quotes/quotes.reducer';

export const reducers: ActionReducerMap<IState> = {
  quotes: quotesReducer,
  media: mediaReducer,
  favourites: favouritesReducer
};
