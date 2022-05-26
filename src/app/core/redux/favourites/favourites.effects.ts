import { Injectable } from '@angular/core';
import { QuotesApiService } from '@core/api/quotes-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as favouritesActions from './favourites.actions';
import { FavouritesStorage } from './favourites.storage';

@Injectable({ providedIn: 'root' })
export class FavouritesEffects {
  public readonly loadFavourites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favouritesActions.loadFavourites),
      switchMap(() =>
        this.quotesAPI.v1QuotesInBulk(this.favouritesStorage.favouriteIDs).pipe(
          map(favourites => favouritesActions.loadFavouritesSuccess({ favourites })),
          catchError(() => of(favouritesActions.loadFavouritesFailure()))
        )
      )
    )
  );

  public readonly addFavourite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(favouritesActions.addFavourite),
        tap(({ quote }) => this.favouritesStorage.addID(quote.id))
      ),
    { dispatch: false }
  );

  public readonly removeFavourite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(favouritesActions.removeFavourite),
        tap(({ id }) => this.favouritesStorage.removeID(id))
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly quotesAPI: QuotesApiService,
    private readonly favouritesStorage: FavouritesStorage
  ) {}
}
