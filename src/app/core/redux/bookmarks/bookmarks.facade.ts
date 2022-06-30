import { getObservableSnapshot } from '@core/rxjs-operators/helpers/get-observable-snapshot.helper';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IState } from '../index.state';
import { IQuote } from '@core/models/quote.model';
import { RequestStatusType } from '@core/types/request-status.type';
import * as bookmarksSelectors from './bookmarks.selectors';
import * as bookmarksActions from './bookmarks.actions';

/**
 * Service-facade for a single access to the ngrx state of bookmarks
 */
@Injectable({ providedIn: 'root' })
export class BookmarksFacade {
  public readonly bookmarks$: Observable<Array<IQuote>>;
  public readonly bookmarksIDs$: Observable<Array<string>>;
  public readonly bookmarksStatus$: Observable<RequestStatusType>;

  constructor(private readonly store: Store<IState>) {
    this.bookmarks$ = store.pipe(select(bookmarksSelectors.selectBookmarks));
    this.bookmarksIDs$ = store.pipe(select(bookmarksSelectors.selectBookmarksIDs));
    this.bookmarksStatus$ = store.pipe(select(bookmarksSelectors.selectBookmarksStatus));
  }

  public get bookmarks(): Array<IQuote> {
    return getObservableSnapshot(this.bookmarks$) || [];
  }

  public get bookmarksIDs(): Array<string> {
    return getObservableSnapshot(this.bookmarksIDs$) || [];
  }

  public get bookmarksStatus(): RequestStatusType {
    return getObservableSnapshot(this.bookmarksStatus$);
  }

  /**
   * Load bookmarks to the store
   */
  public loadBookmarks(): void {
    this.store.dispatch(bookmarksActions.loadBookmarks());
  }

  /**
   * Add new bookmark to store and save it
   */
  public addBookmark(quote: IQuote): void {
    if (!quote || this.bookmarksIDs.includes(quote.id)) {
      return;
    }

    this.store.dispatch(bookmarksActions.addBookmark({ quote }));
  }

  /**
   * Remove existing bookmark from store
   */
  public removeBookmark(id: string): void {
    if (!this.bookmarksIDs.includes(id)) {
      return;
    }

    this.store.dispatch(bookmarksActions.removeBookmark({ id }));
  }
}
