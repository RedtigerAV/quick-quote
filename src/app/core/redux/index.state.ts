import { IBookmarksState } from './bookmarks/bookmarks.state';
import { IPhotosState } from './photo/photos.state';
import { IQuotesState } from './quotes/quotes.state';

export interface IState {
  quotes: IQuotesState;
  photos: IPhotosState;
  bookmarks: IBookmarksState;
}
