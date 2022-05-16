import { Injectable } from '@angular/core';
import { QuotesApiService } from '@core/api/quotes-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, MonoTypeOperatorFunction, of, switchMap } from 'rxjs';
import { QuotesFacade } from './quotes.facade';
import * as quotesActions from './quotes.actions';

@Injectable({ providedIn: 'root' })
export class QuotesEffects {
  public readonly loadQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotesActions.loadRandomQuote),
      switchMap(() => this.quotesAPI.v1QuoteRandomRead().pipe(this.handleQuoteRetrieve()))
    )
  );

  public loadQuoteByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotesActions.loadQuoteByID),
      switchMap(({ id }) => this.quotesAPI.v1QuoteByIdRead(id).pipe(this.handleQuoteRetrieve()))
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly quotesAPI: QuotesApiService,
    private readonly quotesFacade: QuotesFacade
  ) {}

  private handleQuoteRetrieve(): MonoTypeOperatorFunction<any> {
    return quote$ =>
      quote$.pipe(
        map(quote => quotesActions.loadQuoteSuccess({ quote: { ...quote, order: this.quotesFacade.quotesTotal + 1 } })),
        catchError(() => of(quotesActions.loadQuoteFailure()))
      );
  }
}
