import { IQuote } from '@core/models/quote.model';
import { createAction, props } from '@ngrx/store';

export const loadBookmarks = createAction('[Bookmarks] [Command] Load bookmarks');
export const loadBookmarksSuccess = createAction(
  '[Bookmarks] [Query] Load bookmarks -> Success',
  props<{ bookmarks: Array<IQuote> }>()
);
export const loadBookmarksFailure = createAction('[Bookmarks] [Query] Load bookmarks -> Failure');
export const addBookmark = createAction('[Bookmarks] [Command] Add bookmark', props<{ quote: IQuote }>());
export const removeBookmark = createAction('[Bookmarks] [Command] Remove bookmark', props<{ id: string }>());
