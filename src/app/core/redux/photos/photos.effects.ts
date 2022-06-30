import { Injectable } from '@angular/core';
import { PhotosApiService } from '@core/api/photos-api.service';
import { OrientationService } from '@core/services/orientation/orientation.service';
import { RequestStatusEnum } from '@core/types/request-status.type';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, take } from 'rxjs';
import { PhotoTopicsFacade } from '../photo-topics/photo-topics.facade';
import * as photosActions from './photos.actions';

@Injectable({ providedIn: 'root' })
export class PhotosEffects {
  /**
   * Effect for loading photos with selected topics
   */
  public readonly loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(photosActions.loadPhotos),
      switchMap(() =>
        this.photoTopicsFacade.status$.pipe(
          filter(status => status === RequestStatusEnum.SUCCESS || status === RequestStatusEnum.ERROR),
          switchMap(() => this.photoTopicsFacade.selectedTopicsIDs$),
          take(1)
        )
      ),
      switchMap(topics =>
        this.photosAPI.v1PhotosRandomRead({ orientation: this.orientationService.orientation, topics }).pipe(
          map(photos => photosActions.loadPhotosSuccess({ photos })),
          catchError(() => of(photosActions.loadPhotosFailure()))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly photosAPI: PhotosApiService,
    private readonly photoTopicsFacade: PhotoTopicsFacade,
    private readonly orientationService: OrientationService
  ) {}
}
