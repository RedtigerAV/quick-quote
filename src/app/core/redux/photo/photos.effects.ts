import { Injectable } from '@angular/core';
import { PhotosApiService } from '@core/api/photos-api.service';
import { OrientationService } from '@core/services/orientation/orientation.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as photosActions from './photos.actions';

@Injectable({ providedIn: 'root' })
export class PhotosEffects {
  public readonly loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(photosActions.loadPhotos),
      switchMap(() =>
        this.photosAPI.v1PhotosRandomRead({ orientation: this.orientationService.orientation }).pipe(
          map(photos => photosActions.loadPhotosSuccess({ photos })),
          catchError(() => of(photosActions.loadPhotosFailure()))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly photosAPI: PhotosApiService,
    private readonly orientationService: OrientationService
  ) {}
}
