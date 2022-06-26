import { RequestStatusEnum } from '@core/types/request-status.type';
import { createReducer, on } from '@ngrx/store';
import { IBookmarksState } from './bookmarks.state';
import * as bookmarksActions from './bookmarks.actions';

const initialState: IBookmarksState = {
  bookmarks: [],
  status: RequestStatusEnum.PENDING
};

export const bookmarksReducer = createReducer(
  initialState,
  on(bookmarksActions.loadBookmarks, (state): IBookmarksState => ({ ...state, status: RequestStatusEnum.LOADING })),
  on(
    bookmarksActions.loadBookmarksSuccess,
    (_, { bookmarks }): IBookmarksState => ({ bookmarks, status: RequestStatusEnum.SUCCESS })
  ),
  on(
    bookmarksActions.loadBookmarksFailure,
    (state): IBookmarksState => ({ ...state, status: RequestStatusEnum.ERROR })
  ),
  on(
    bookmarksActions.addBookmark,
    (state, { quote }): IBookmarksState => ({ ...state, bookmarks: [quote, ...state.bookmarks] })
  ),
  on(
    bookmarksActions.removeBookmark,
    (state, { id }): IBookmarksState => ({ ...state, bookmarks: state.bookmarks.filter(quote => quote.id !== id) })
  )
);
