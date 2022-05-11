import { Injectable } from '@angular/core';
import { MediaApiService } from '@core/api/media-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as actions from './background-images.actions';

@Injectable()
export class BackgroundImagesEffects {
  public readonly loadCurrentImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadCurrentBackgroundImage),
      switchMap(() =>
        this.mediaAPI.v1MediaRead().pipe(
          map(image => actions.loadCurrentBackgroundImageSuccess({ image })),
          catchError(() => of(actions.loadCurrentBackgroundImageFailure()))
        )
      )
    )
  );

  public readonly loadNextImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadNextBackgroundImage),
      switchMap(() =>
        this.mediaAPI.v1MediaRead().pipe(
          map(image => actions.loadNextBackgroundImageSuccess({ image })),
          catchError(() => of(actions.loadNextBackgroundImageFailure()))
        )
      )
    )
  );

  public readonly goToNextImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.goToNextBackgroundImage),
      switchMap(() => of(actions.loadNextBackgroundImage()))
    )
  );

  constructor(private readonly actions$: Actions, private readonly mediaAPI: MediaApiService) {}
}
