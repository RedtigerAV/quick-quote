import { Actions, ofType } from '@ngrx/effects';
import { getObservableSnapshot } from '@core/rxjs-operators/helpers/get-observable-snapshot.helper';
import { Nullable } from '@core/types/nullable.type';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
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
  public readonly selectedQuoteID$: Observable<Nullable<string>>;
  public readonly selectedQuote$: Observable<Nullable<IQuote>>;
  public readonly quotesIDs$: Observable<Array<string>>;
  public readonly nextQuote$: Observable<Nullable<IQuote>>;
  public readonly prevQuote$: Observable<Nullable<IQuote>>;
  public readonly currentQuotePosition$: Observable<Nullable<number>>;

  public readonly loadQuoteSuccessAction$: Observable<{ quote: IQuote }>;
  public readonly loadQuoteFailureAction$: Observable<Action>;

  constructor(private readonly store: Store<IState>, actions$: Actions) {
    this.quotes$ = store.pipe(select(quotesSelectors.selectQuotes));
    this.selectedQuoteID$ = store.pipe(select(quotesSelectors.selectCurrentQuoteID));
    this.selectedQuote$ = store.pipe(select(quotesSelectors.selectCurrentQuote));
    this.quotesIDs$ = store.pipe(select(quotesSelectors.selectQuotesIDs));
    this.nextQuote$ = store.pipe(select(quotesSelectors.selectNextQuote));
    this.prevQuote$ = store.pipe(select(quotesSelectors.selectPrevQuote));
    this.currentQuotePosition$ = store.pipe(select(quotesSelectors.selectCurrentQuotePosition));

    this.loadQuoteSuccessAction$ = actions$.pipe(ofType(quotesActions.loadQuoteSuccess));
    this.loadQuoteFailureAction$ = actions$.pipe(ofType(quotesActions.loadQuoteFailure));
  }

  public get quotes(): Array<IQuote> {
    return getObservableSnapshot(this.quotes$) || [];
  }

  public get selectedQuoteID(): Nullable<string> {
    return getObservableSnapshot(this.selectedQuoteID$) || null;
  }

  public get selectedQuote(): Nullable<IQuote> {
    return getObservableSnapshot(this.selectedQuote$);
  }

  public get quotesIDs(): Array<string> {
    return getObservableSnapshot(this.quotesIDs$) || [];
  }

  public get nextQuote(): Nullable<IQuote> {
    return getObservableSnapshot(this.nextQuote$);
  }

  public get prevQuote(): Nullable<IQuote> {
    return getObservableSnapshot(this.prevQuote$);
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
