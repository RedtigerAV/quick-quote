import { Injectable } from '@angular/core';
import { MediaApiService } from '@core/api/media-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as mediaActions from './media.actions';

@Injectable({ providedIn: 'root' })
export class MediaEffects {
  public readonly loadImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mediaActions.loadImages),
      switchMap(() =>
        this.mediaAPI.v1MediaRead().pipe(
          map(images => mediaActions.loadImagesSuccess({ images })),
          catchError(() => of(mediaActions.loadImagesFailure()))
        )
      )
    )
  );

  constructor(private readonly actions$: Actions, private readonly mediaAPI: MediaApiService) {}
}
