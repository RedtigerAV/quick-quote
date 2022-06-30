import { Injectable } from '@angular/core';
import { QuotesApiService } from '@core/api/quotes-api.service';
import { IQuote } from '@core/models/quote.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as bookmarksActions from './bookmarks.actions';
import { BookmarksStorage } from './bookmarks.storage';

function sortBookmarksFunction(ids: string[]): (a: IQuote, b: IQuote) => number {
  return (bookmark1: { id: any }, bookmark2: { id: any }) => {
    const id1 = bookmark1.id;
    const id2 = bookmark2.id;
    const position1 = ids.findIndex(id => id === id1);
    const position2 = ids.findIndex(id => id === id2);

    return position1 - position2;
  };
}

@Injectable({ providedIn: 'root' })
export class BookmarksEffects {
  /**
   * Loading bookmarks and processing them
   */
  public readonly loadBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookmarksActions.loadBookmarks),
      switchMap(() =>
        this.quotesAPI.v1QuotesInBulk(this.bookmarksStorage.bookmarkIDs).pipe(
          map(bookmarks => bookmarks.sort(sortBookmarksFunction(this.bookmarksStorage.bookmarkIDs))),
          map(bookmarks => bookmarksActions.loadBookmarksSuccess({ bookmarks })),
          catchError(() => of(bookmarksActions.loadBookmarksFailure()))
        )
      )
    )
  );

  /**
   * Side effect for adding bookmark to LocalStorage
   */
  public readonly addBookmark$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(bookmarksActions.addBookmark),
        tap(({ quote }) => this.bookmarksStorage.addID(quote.id))
      ),
    { dispatch: false }
  );

  /**
   * Side effect for removing bookmark from LocalStorage
   */
  public readonly removeBookmark$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(bookmarksActions.removeBookmark),
        tap(({ id }) => this.bookmarksStorage.removeID(id))
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly quotesAPI: QuotesApiService,
    private readonly bookmarksStorage: BookmarksStorage
  ) {}
}
