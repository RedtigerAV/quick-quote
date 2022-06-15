import { Injectable } from '@angular/core';
import { IQuoteTopic } from '@core/models/quote-topic.model';
import { getObservableSnapshot } from '@core/rxjs-operators/helpers/get-observable-snapshot.helper';
import { RequestStatusType } from '@core/types/request-status.type';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IState } from '../index.state';
import * as quoteTopicsSelectors from './quote-topics.selectors';
import * as quoteTopicsActions from './quote-topics.actions';

@Injectable({ providedIn: 'root' })
export class QuoteTopicsFacade {
  public readonly topics$: Observable<Array<IQuoteTopic>>;
  public readonly topicsIDs$: Observable<Array<string>>;
  public readonly selectedTopics$: Observable<Array<IQuoteTopic>>;
  public readonly selectedTopicsIDs$: Observable<Array<string>>;
  public readonly status$: Observable<RequestStatusType>;

  constructor(private readonly store: Store<IState>) {
    this.topics$ = store.pipe(select(quoteTopicsSelectors.selectAllTopics));
    this.topicsIDs$ = store.pipe(select(quoteTopicsSelectors.selectAllTopicsIDs));
    this.selectedTopics$ = store.pipe(select(quoteTopicsSelectors.selectSelectedTopics));
    this.selectedTopicsIDs$ = store.pipe(select(quoteTopicsSelectors.selectSelectedTopicsIDs));
    this.status$ = store.pipe(select(quoteTopicsSelectors.selectStatus));
  }

  public get topics(): Array<IQuoteTopic> {
    return getObservableSnapshot(this.topics$);
  }

  public get topicsIDs(): Array<string> {
    return getObservableSnapshot(this.topicsIDs$);
  }

  public get selectedTopics(): Array<IQuoteTopic> {
    return getObservableSnapshot(this.selectedTopics$);
  }

  public get selectedTopicsIDs(): Array<string> {
    return getObservableSnapshot(this.selectedTopicsIDs$);
  }

  public get status(): RequestStatusType {
    return getObservableSnapshot(this.status$);
  }

  public loadTopics(): void {
    this.store.dispatch(quoteTopicsActions.loadQuoteTopics());
  }
}
