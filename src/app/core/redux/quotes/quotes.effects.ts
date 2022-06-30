import { Injectable } from '@angular/core';
import { QuotesApiService } from '@core/api/quotes-api.service';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, MonoTypeOperatorFunction, of, switchMap, take } from 'rxjs';
import { QuotesFacade } from './quotes.facade';
import * as quotesActions from './quotes.actions';
import { QuoteTopicsFacade } from '../quote-topics/quote-topics.facade';
import { RequestStatusEnum } from '@core/types/request-status.type';

@Injectable({ providedIn: 'root' })
export class QuotesEffects {
  /**
   * Loading random quote and add to storage
   */
  public readonly loadQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotesActions.loadRandomQuote),
      switchMap(() =>
        this.quoteTopicsFacade.status$.pipe(
          filter(status => status === RequestStatusEnum.SUCCESS || status === RequestStatusEnum.ERROR),
          switchMap(() => this.quoteTopicsFacade.selectedTopicsIDs$),
          take(1)
        )
      ),
      switchMap(topicIDs => this.quotesAPI.v1QuoteRandomRead({ topicIDs }).pipe(this.handleQuoteRetrieve()))
    )
  );

  /**
   * Loading quote by id and add to storage
   */
  public readonly loadQuoteByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotesActions.loadQuoteByID),
      switchMap(({ id }) => this.quotesAPI.v1QuoteByIdRead(id).pipe(this.handleQuoteRetrieve()))
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly quotesAPI: QuotesApiService,
    private readonly quotesFacade: QuotesFacade,
    private readonly quoteTopicsFacade: QuoteTopicsFacade
  ) {}

  private handleQuoteRetrieve(): MonoTypeOperatorFunction<any> {
    return quote$ =>
      quote$.pipe(
        map(quote => {
          if (this.quotesFacade.quotesIDs.includes(quote.id)) {
            throw new Error(`Quote with id ${quote.id} already exists`);
          }

          return quotesActions.loadQuoteSuccess({ quote });
        }),
        catchError(() => of(quotesActions.loadQuoteFailure()))
      );
  }
}
