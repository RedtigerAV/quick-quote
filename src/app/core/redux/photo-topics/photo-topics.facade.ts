import { Injectable } from '@angular/core';
import { IPhotoTopic } from '@core/models/photo-topic.model';
import { getObservableSnapshot } from '@core/rxjs-operators/helpers/get-observable-snapshot.helper';
import { RequestStatusType } from '@core/types/request-status.type';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IState } from '../index.state';
import * as photoTopicsSelectors from './photo-topics.selectors';
import * as photoTopicsActions from './photo-topics.actions';

/**
 * Service-facade for a single access to the ngrx state of photo topics
 */
@Injectable({ providedIn: 'root' })
export class PhotoTopicsFacade {
  public readonly topics$: Observable<Array<IPhotoTopic>>;
  public readonly topicsIDs$: Observable<Array<string>>;
  public readonly selectedTopics$: Observable<Array<IPhotoTopic>>;
  public readonly selectedTopicsIDs$: Observable<Array<string>>;
  public readonly status$: Observable<RequestStatusType>;

  constructor(private readonly store: Store<IState>) {
    this.topics$ = store.pipe(select(photoTopicsSelectors.selectAllTopics));
    this.topicsIDs$ = store.pipe(select(photoTopicsSelectors.selectAllTopicsIDs));
    this.selectedTopics$ = store.pipe(select(photoTopicsSelectors.selectSelectedTopics));
    this.selectedTopicsIDs$ = store.pipe(select(photoTopicsSelectors.selectSelectedTopicsIDs));
    this.status$ = store.pipe(select(photoTopicsSelectors.selectStatus));
  }

  public get topics(): Array<IPhotoTopic> {
    return getObservableSnapshot(this.topics$);
  }

  public get topicsIDs(): Array<string> {
    return getObservableSnapshot(this.topicsIDs$);
  }

  public get selectedTopics(): Array<IPhotoTopic> {
    return getObservableSnapshot(this.selectedTopics$);
  }

  public get selectedTopicsIDs(): Array<string> {
    return getObservableSnapshot(this.selectedTopicsIDs$);
  }

  public get status(): RequestStatusType {
    return getObservableSnapshot(this.status$);
  }

  /**
   * Load all photo topics from unsplash
   */
  public loadTopics(): void {
    this.store.dispatch(photoTopicsActions.loadPhotoTopics());
  }

  /**
   * Select topics for filtration of random photos
   * @param topicIDs Topic IDs to select
   */
  public selectTopics(topicIDs: string[]): void {
    this.store.dispatch(photoTopicsActions.selectPhotoTopics({ topicsIDsForSelection: topicIDs }));
  }
}
