import { switchMap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { QuotesApiService } from '@core/api/quotes-api.service';
import * as actions from './quotes.actions';

@Injectable()
export class QuotesEffects {
  public readonly loadCurrentQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadCurrentQuote),
      switchMap(() =>
        this.quotesAPI.v1QuoteRandomRead().pipe(
          map(quote => actions.loadCurrentQuoteSuccess({ quote })),
          catchError(() => of(actions.loadCurrentQuoteFailure()))
        )
      )
    )
  );

  public readonly loadCurrentQuoteByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadCurrentQuoteByID),
      switchMap(({ id }) =>
        this.quotesAPI.v1QuoteByIdRead(id).pipe(
          map(quote => actions.loadCurrentQuoteSuccess({ quote })),
          catchError(() => of(actions.loadCurrentQuoteFailure()))
        )
      )
    )
  );

  public readonly loadNextQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadNextQuote),
      switchMap(() =>
        this.quotesAPI.v1QuoteRandomRead().pipe(
          map(quote => actions.loadNextQuoteSuccess({ quote })),
          catchError(() => of(actions.loadNextQuoteFailure()))
        )
      )
    )
  );

  public readonly goToNextQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.goToNextQuote),
      switchMap(() => of(actions.loadNextQuote()))
    )
  );

  constructor(private readonly actions$: Actions, private readonly quotesAPI: QuotesApiService) {}
}
