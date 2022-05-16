import { Actions, ofType } from '@ngrx/effects';
import { getObservableSnapshot } from '@core/rxjs-operators/helpers/get-observable-snapshot.helper';
import { Nullable } from '@core/types/nullable.type';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store, select, Action, ActionType } from '@ngrx/store';
import { IState } from '../index.state';
import { IQuote } from '@core/models/quote.model';
import * as quotesActions from './quotes.actions';
import * as quotesSelectors from './quotes.selectors';

@Injectable({ providedIn: 'root' })
export class QuotesFacade {
  /**
   * Ordered array of quotes
   */
  public readonly quotes$: Observable<Array<IQuote>>;
  public readonly selectedQuote$: Observable<Nullable<IQuote>>;
  public readonly selectedQuoteID$: Observable<Nullable<string>>;
  public readonly quotesTotal$: Observable<number>;
  public readonly quotesIDs$: Observable<Array<string>>;

  public readonly loadQuoteSuccessAction$: Observable<{ quote: IQuote }>;
  public readonly loadQuoteFailureAction$: Observable<Action>;

  constructor(private readonly store: Store<IState>, actions$: Actions) {
    this.quotes$ = store.pipe(select(quotesSelectors.selectAllQuotes));
    this.selectedQuote$ = store.pipe(select(quotesSelectors.selectCurrentQuote));
    this.selectedQuoteID$ = store.pipe(select(quotesSelectors.selectCurrentQuoteID));
    this.quotesTotal$ = store.pipe(select(quotesSelectors.selectQuotesTotal));
    this.quotesIDs$ = store.pipe(select(quotesSelectors.selectQuotesIDs)) as Observable<Array<string>>;

    this.loadQuoteSuccessAction$ = actions$.pipe(ofType(quotesActions.loadQuoteSuccess));
    this.loadQuoteFailureAction$ = actions$.pipe(ofType(quotesActions.loadQuoteFailure));
  }

  public get quotes(): Array<IQuote> {
    return getObservableSnapshot(this.quotes$) || [];
  }

  public get quotesTotal(): number {
    return getObservableSnapshot(this.quotesTotal$) || 0;
  }

  public get quotesIDs(): Array<string> {
    return getObservableSnapshot(this.quotesIDs$) || [];
  }

  public get selectedQuoteID(): Nullable<string> {
    return getObservableSnapshot(this.selectedQuoteID$) || null;
  }

  public loadQuote(id?: string): void {
    if (!!id) {
      this.store.dispatch(quotesActions.loadQuoteByID({ id }));

      return;
    }

    this.store.dispatch(quotesActions.loadRandomQuote());
  }

  public selectQuote(id: string): void {
    if (!this.quotesIDs.includes(id)) {
      throw new Error(`Uknown quote id: ${id}`);
    }

    this.store.dispatch(quotesActions.selectQuote({ id }));
  }
}
