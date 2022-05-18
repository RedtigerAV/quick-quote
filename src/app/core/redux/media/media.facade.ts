import { Injectable } from '@angular/core';
import { IMedia } from '@core/models/media.model';
import { Nullable } from '@core/types/nullable.type';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IState } from '../index.state';
import * as mediaSelectors from './media.selectors';
import * as mediaActions from './media.actions';
import { getObservableSnapshot } from '@core/rxjs-operators/helpers/get-observable-snapshot.helper';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class MediaFacade {
  public readonly images$: Observable<Array<IMedia>>;
  public readonly imageIDs$: Observable<Array<string>>;
  public readonly selectedImageID$: Observable<Nullable<string>>;
  public readonly selectedImage$: Observable<Nullable<IMedia>>;
  public readonly selectedImagePosition$: Observable<Nullable<number>>;
  public readonly nextImage$: Observable<Nullable<IMedia>>;
  public readonly prevImage$: Observable<Nullable<IMedia>>;

  public readonly loadImagesSuccessAction$: Observable<{ images: Array<IMedia> }>;
  public readonly loadImagesFailureAction$: Observable<Action>;

  constructor(private readonly store: Store<IState>, actions$: Actions) {
    this.images$ = store.pipe(select(mediaSelectors.selectImages));
    this.imageIDs$ = store.pipe(select(mediaSelectors.selectImagesIDs));
    this.selectedImageID$ = store.pipe(select(mediaSelectors.selectCurrentImageID));
    this.selectedImage$ = store.pipe(select(mediaSelectors.selectCurrentImage));
    this.selectedImagePosition$ = store.pipe(select(mediaSelectors.selectCurrentImagePosition));
    this.nextImage$ = store.pipe(select(mediaSelectors.selectNextImage));
    this.prevImage$ = store.pipe(select(mediaSelectors.selectPrevImage));

    this.loadImagesSuccessAction$ = actions$.pipe(ofType(mediaActions.loadImagesSuccess));
    this.loadImagesFailureAction$ = actions$.pipe(ofType(mediaActions.loadImagesFailure));
  }

  public get images(): Array<IMedia> {
    return getObservableSnapshot(this.images$);
  }

  public get imageIDs(): Array<string> {
    return getObservableSnapshot(this.imageIDs$);
  }

  public get selectedImageID(): Nullable<string> {
    return getObservableSnapshot(this.selectedImageID$);
  }

  public get selectedImage(): Nullable<IMedia> {
    return getObservableSnapshot(this.selectedImage$);
  }

  public get selectedImagePosition(): Nullable<number> {
    return getObservableSnapshot(this.selectedImagePosition$);
  }

  public get nextImage(): Nullable<IMedia> {
    return getObservableSnapshot(this.nextImage$);
  }

  public get prevImage(): Nullable<IMedia> {
    return getObservableSnapshot(this.prevImage$);
  }

  public loadImages(): void {
    this.store.dispatch(mediaActions.loadImages());
  }

  public selectImage(id: string): void {
    if (!id || !this.imageIDs.includes(id)) {
      throw new Error(`Uknown image id: ${id}`);
    }

    this.store.dispatch(mediaActions.selectImage({ id }));
  }
}
