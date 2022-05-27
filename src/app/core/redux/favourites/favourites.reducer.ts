import { RequestStatusEnum } from '@core/types/request-status.type';
import { createReducer, on } from '@ngrx/store';
import { IFavouritesState } from './favourites.state';
import * as favouritesActions from './favourites.actions';

const initialState: IFavouritesState = {
  favourites: [],
  status: RequestStatusEnum.PENDING
};

export const favouritesReducer = createReducer(
  initialState,
  on(favouritesActions.loadFavourites, (state): IFavouritesState => ({ ...state, status: RequestStatusEnum.LOADING })),
  on(
    favouritesActions.loadFavouritesSuccess,
    (_, { favourites }): IFavouritesState => ({ favourites, status: RequestStatusEnum.SUCCESS })
  ),
  on(
    favouritesActions.loadFavouritesFailure,
    (state): IFavouritesState => ({ ...state, status: RequestStatusEnum.ERROR })
  ),
  on(
    favouritesActions.addFavourite,
    (state, { quote }): IFavouritesState => ({ ...state, favourites: [quote, ...state.favourites] })
  ),
  on(
    favouritesActions.removeFavourite,
    (state, { id }): IFavouritesState => ({ ...state, favourites: state.favourites.filter(quote => quote.id !== id) })
  )
);
