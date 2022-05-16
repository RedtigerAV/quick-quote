import { ActionReducerMap } from '@ngrx/store';
import { IState } from './index.state';
import { quotesReducer } from './quotes/quotes.reducer';

export const reducers: ActionReducerMap<IState> = {
  quotes: quotesReducer
};
