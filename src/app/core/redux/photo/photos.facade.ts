import { Injectable } from '@angular/core';
import { IPhoto } from '@core/models/photo.model';
import { Nullable } from '@core/types/nullable.type';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IState } from '../index.state';
import * as photosSelectors from './photos.selectors';
import * as photosActions from './photos.actions';
import { getObservableSnapshot } from '@core/rxjs-operators/helpers/get-observable-snapshot.helper';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class PhotosFacade {
  public readonly photos$: Observable<Array<IPhoto>>;
  public readonly photoIDs$: Observable<Array<string>>;
  public readonly selectedPhotoID$: Observable<Nullable<string>>;
  public readonly selectedPhoto$: Observable<Nullable<IPhoto>>;
  public readonly selectedPhotoPosition$: Observable<Nullable<number>>;
  public readonly nextPhoto$: Observable<Nullable<IPhoto>>;
  public readonly prevPhoto$: Observable<Nullable<IPhoto>>;

  public readonly loadPhotosSuccessAction$: Observable<{ photos: Array<IPhoto> }>;
  public readonly loadPhotosFailureAction$: Observable<Action>;

  constructor(private readonly store: Store<IState>, actions$: Actions) {
    this.photos$ = store.pipe(select(photosSelectors.selectPhotos));
    this.photoIDs$ = store.pipe(select(photosSelectors.selectPhotosIDs));
    this.selectedPhotoID$ = store.pipe(select(photosSelectors.selectCurrentPhotoID));
    this.selectedPhoto$ = store.pipe(select(photosSelectors.selectCurrentPhoto));
    this.selectedPhotoPosition$ = store.pipe(select(photosSelectors.selectCurrentPhotoPosition));
    this.nextPhoto$ = store.pipe(select(photosSelectors.selectNextPhoto));
    this.prevPhoto$ = store.pipe(select(photosSelectors.selectPrevPhoto));

    this.loadPhotosSuccessAction$ = actions$.pipe(ofType(photosActions.loadPhotosSuccess));
    this.loadPhotosFailureAction$ = actions$.pipe(ofType(photosActions.loadPhotosFailure));
  }

  public get photos(): Array<IPhoto> {
    return getObservableSnapshot(this.photos$);
  }

  public get photoIDs(): Array<string> {
    return getObservableSnapshot(this.photoIDs$);
  }

  public get selectedPhotoID(): Nullable<string> {
    return getObservableSnapshot(this.selectedPhotoID$);
  }

  public get selectedPhoto(): Nullable<IPhoto> {
    return getObservableSnapshot(this.selectedPhoto$);
  }

  public get selectedPhotoPosition(): Nullable<number> {
    return getObservableSnapshot(this.selectedPhotoPosition$);
  }

  public get nextPhoto(): Nullable<IPhoto> {
    return getObservableSnapshot(this.nextPhoto$);
  }

  public get prevPhoto(): Nullable<IPhoto> {
    return getObservableSnapshot(this.prevPhoto$);
  }

  public loadPhotos(): void {
    this.store.dispatch(photosActions.loadPhotos());
  }

  public selectPhotos(id: string): void {
    if (!id || !this.photoIDs.includes(id)) {
      throw new Error(`Uknown photo id: ${id}`);
    }

    this.store.dispatch(photosActions.selectPhoto({ id }));
  }
}
