import { Injectable } from '@angular/core';
import { PhotosApiService } from '@core/api/photos-api.service';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import * as photoTopicsActions from './photo-topics.actions';
import { loadPhotos } from '../photos/photos.actions';
import { PhotoTopicsFacade } from './photo-topics.facade';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { RequestStatusEnum } from '@core/types/request-status.type';
import { PhotoTopicsStorage } from './photo-topics.storage';

@Injectable({ providedIn: 'root' })
export class PhotoTopicsEffects {
  /**
   * Effect for initializing photo topics only when they should be loaded
   */
  public readonly initializePhotoTopics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPhotos),
      switchMap(() => this.photoTopicsFacade.status$),
      filter(status => status === RequestStatusEnum.PENDING),
      map(() => photoTopicsActions.loadPhotoTopics())
    )
  );

  /**
   * Effect for loading photo topics and save them
   */
  public readonly loadPhotoTopics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(photoTopicsActions.loadPhotoTopics),
      switchMap(() =>
        this.photosAPI.v1PhotoTopicsRead().pipe(
          map(topics => topics.sort((a, b) => a.name.localeCompare(b.name))),
          map(topics => photoTopicsActions.loadPhotoTopicsSuccess({ topics })),
          catchError(() => of(photoTopicsActions.loadPhotoTopicsFailure()))
        )
      )
    )
  );

  /**
   * Effect for loading selected photo topics from LocalStorage
   */
  public readonly initializeSelectedTopics = createEffect(() =>
    this.actions$.pipe(
      ofType(photoTopicsActions.loadPhotoTopicsSuccess),
      map(({ topics }) => {
        const selectedTopicsIDs = this.photoTopicsStorage.selectedTopicsIDs;
        const selectedTopics = topics.filter(({ id }) => selectedTopicsIDs.includes(id));

        return photoTopicsActions.selectPhotoTopicsSuccess({ selectedTopics });
      })
    )
  );

  /**
   * Effect for setting a new topics for photos
   */
  public readonly selectTopics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(photoTopicsActions.selectPhotoTopics),
      concatLatestFrom(() => this.photoTopicsFacade.topics$),
      map(([{ topicsIDsForSelection }, topics]) => {
        const allTopicsIDs = topics.map(({ id }) => id);
        const filteredTopicIDs = topicsIDsForSelection.filter(id => allTopicsIDs.includes(id));
        const selectedTopics = topics.filter(({ id }) => filteredTopicIDs.includes(id));

        this.photoTopicsStorage.selectedTopicsIDs = filteredTopicIDs;

        return photoTopicsActions.selectPhotoTopicsSuccess({ selectedTopics });
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly photosAPI: PhotosApiService,
    private readonly photoTopicsFacade: PhotoTopicsFacade,
    private readonly photoTopicsStorage: PhotoTopicsStorage
  ) {}
}
