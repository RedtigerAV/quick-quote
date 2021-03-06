import { IQuote } from '@core/models/quote.model';
import { RequestStatusType } from '@core/types/request-status.type';

export interface IBookmarksState {
  bookmarks: Array<IQuote>;
  status: RequestStatusType;
}
