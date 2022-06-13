import { ActionReducerMap } from '@ngrx/store';
import { bookmarksReducer } from './bookmarks/bookmarks.reducer';
import { IState } from './index.state';
import { photosReducer } from './photo/photos.reducer';
import { quotesReducer } from './quotes/quotes.reducer';

export const reducers: ActionReducerMap<IState> = {
  quotes: quotesReducer,
  photos: photosReducer,
  bookmarks: bookmarksReducer
};
