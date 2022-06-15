import { IBookmarksState } from './bookmarks/bookmarks.state';
import { IPhotosState } from './photo/photos.state';
import { IQuoteTopicsState } from './quote-topics/quote-topics.state';
import { IQuotesState } from './quotes/quotes.state';

export interface IState {
  quotes: IQuotesState;
  photos: IPhotosState;
  bookmarks: IBookmarksState;
  quoteTopics: IQuoteTopicsState;
}
