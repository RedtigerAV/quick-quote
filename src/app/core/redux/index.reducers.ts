import { ActionReducerMap } from '@ngrx/store';
import { bookmarksReducer } from './bookmarks/bookmarks.reducer';
import { IState } from './index.state';
import { photoTopicsReducer } from './photo-topics/photo-topics.reducer';
import { photosReducer } from './photo/photos.reducer';
import { quoteTopicsReducer } from './quote-topics/quote-topics.reducer';
import { quotesReducer } from './quotes/quotes.reducer';

export const reducers: ActionReducerMap<IState> = {
  quotes: quotesReducer,
  photos: photosReducer,
  bookmarks: bookmarksReducer,
  quoteTopics: quoteTopicsReducer,
  photoTopics: photoTopicsReducer
};
