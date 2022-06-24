import { Injectable } from '@angular/core';
import { QuotesApiService } from '@core/api/quotes-api.service';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import * as quoteTopicsActions from './quote-topics.actions';
import { loadRandomQuote } from '../quotes/quotes.actions';
import { QuoteTopicsFacade } from './quote-topics.facade';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { RequestStatusEnum } from '@core/types/request-status.type';
import { QuoteTopicsStorage } from './quote-topics.storage';

@Injectable({ providedIn: 'root' })
export class QuoteTopicsEffects {
  public readonly initializeQuoteTopics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRandomQuote),
      switchMap(() => this.quoteTopicsFacade.status$),
      filter(status => status === RequestStatusEnum.PENDING),
      map(() => quoteTopicsActions.loadQuoteTopics())
    )
  );

  public readonly loadQuoteTopics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quoteTopicsActions.loadQuoteTopics),
      switchMap(() =>
        this.quotesAPI.v1QuoteTopicsRead().pipe(
          map(topics => topics.sort((a, b) => a.name.localeCompare(b.name))),
          map(topics => quoteTopicsActions.loadQuoteTopicsSuccess({ topics })),
          catchError(() => of(quoteTopicsActions.loadQuoteTopicsFailure()))
        )
      )
    )
  );

  public readonly initializeSelectedTopics = createEffect(() =>
    this.actions$.pipe(
      ofType(quoteTopicsActions.loadQuoteTopicsSuccess),
      map(({ topics }) => {
        const selectedTopicsIDs = this.quoteTopicsStorage.selectedTopicsIDs;
        const selectedTopics = topics.filter(({ id }) => selectedTopicsIDs.includes(id));

        return quoteTopicsActions.selectQuoteTopicsSuccess({ selectedTopics });
      })
    )
  );

  public readonly selectTopics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quoteTopicsActions.selectQuoteTopics),
      concatLatestFrom(() => this.quoteTopicsFacade.topics$),
      map(([{ topicsIDsForSelection }, topics]) => {
        const allTopicsIDs = topics.map(({ id }) => id);
        const filteredTopicIDs = topicsIDsForSelection.filter(id => allTopicsIDs.includes(id));
        const selectedTopics = topics.filter(({ id }) => filteredTopicIDs.includes(id));

        this.quoteTopicsStorage.selectedTopicsIDs = filteredTopicIDs;

        return quoteTopicsActions.selectQuoteTopicsSuccess({ selectedTopics });
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly quotesAPI: QuotesApiService,
    private readonly quoteTopicsFacade: QuoteTopicsFacade,
    private readonly quoteTopicsStorage: QuoteTopicsStorage
  ) {}
}
