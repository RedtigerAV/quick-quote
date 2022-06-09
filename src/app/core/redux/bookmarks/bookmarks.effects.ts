import { Injectable } from '@angular/core';
import { QuotesApiService } from '@core/api/quotes-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as bookmarksActions from './bookmarks.actions';
import { BookmarksStorage } from './bookmarks.storage';

@Injectable({ providedIn: 'root' })
export class BookmarksEffects {
  public readonly loadBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookmarksActions.loadBookmarks),
      switchMap(() =>
        this.quotesAPI.v1QuotesInBulk(this.bookmarksStorage.bookmarkIDs).pipe(
          // TODO: сортировать согласно bookmarkIDs
          map(bookmarks => bookmarksActions.loadBookmarksSuccess({ bookmarks })),
          catchError(() => of(bookmarksActions.loadBookmarksFailure()))
        )
      )
    )
  );

  public readonly addBookmark$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(bookmarksActions.addBookmark),
        tap(({ quote }) => this.bookmarksStorage.addID(quote.id))
      ),
    { dispatch: false }
  );

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
