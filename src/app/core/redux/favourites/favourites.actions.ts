import { IQuote } from '@core/models/quote.model';
import { createAction, props } from '@ngrx/store';

export const loadFavourites = createAction('[Favourites] [Command] Load favourites');
export const loadFavouritesSuccess = createAction(
  '[Favourites] [Query] Load favourites -> Success',
  props<{ favourites: Array<IQuote> }>()
);
export const loadFavouritesFailure = createAction('[Favourites] [Query] Load favourites -> Failure');
export const addFavourite = createAction('[Favourites] [Command] Add favourite', props<{ quote: IQuote }>());
export const removeFavourite = createAction('[Favourites] [Command] Remove favourite', props<{ id: string }>());
