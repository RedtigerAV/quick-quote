import { Actions, ofType } from '@ngrx/effects';
import { getObservableSnapshot } from '@core/rxjs-operators/helpers/get-observable-snapshot.helper';
import { Nullable } from '@core/types/nullable.type';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { IState } from '../index.state';
import { IQuote } from '@core/models/quote.model';
import * as quotesActions from './quotes.actions';
import * as quotesSelectors from './quotes.selectors';

/**
 * Service-facade for a single access to the ngrx state of quotes
 */
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
  public readonly currentPosition$: Observable<number>;
  public readonly quotesTotal$: Observable<number>;

  public readonly loadQuoteSuccessAction$: Observable<{ quote: IQuote }>;
  public readonly loadQuoteFailureAction$: Observable<Action>;

  constructor(private readonly store: Store<IState>, actions$: Actions) {
    this.quotes$ = store.pipe(select(quotesSelectors.selectQuotes));
    this.selectedQuoteID$ = store.pipe(select(quotesSelectors.selectCurrentQuoteID));
    this.selectedQuote$ = store.pipe(select(quotesSelectors.selectCurrentQuote));
    this.quotesIDs$ = store.pipe(select(quotesSelectors.selectQuotesIDs));
    this.nextQuote$ = store.pipe(select(quotesSelectors.selectNextQuote));
    this.prevQuote$ = store.pipe(select(quotesSelectors.selectPrevQuote));
    this.currentPosition$ = store.pipe(select(quotesSelectors.selectCurrentPosition));
    this.quotesTotal$ = this.quotes$.pipe(map(quotes => quotes.length));

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

  public get currentPosition(): number {
    return getObservableSnapshot(this.currentPosition$);
  }

  public get quotesTotal(): number {
    return this.quotes.length;
  }

  /**
   * Load random quote or quote by ID
   * @param id ID of desired quote. If not specified, a random quote will be loaded
   * @returns
   */
  public loadQuote(id?: string): void {
    if (!!id) {
      this.store.dispatch(quotesActions.loadQuoteByID({ id }));

      return;
    }

    this.store.dispatch(quotesActions.loadRandomQuote());
  }

  /**
   * Select a quote to display to the user
   * @param position position of quote to display
   */
  public selectQuote(position: number): void {
    this.store.dispatch(quotesActions.selectQuote({ position }));
  }

  /**
   * Add quote to user's feed
   * @param quote quote to add
   * @param position position, where to add quote
   */
  public addQuote(quote: IQuote, position: number): void {
    this.store.dispatch(quotesActions.addQuote({ quote, position }));
  }

  /**
   * Remove quotes from storage
   * @param start position from which to remove
   * @param finish position for which to remove (not included)
   */
  public removeQuotes(start: number, finish: number): void {
    const startPosition = Math.max(start, 0);
    const finishPosition = Math.min(finish, this.quotes.length);

    this.store.dispatch(quotesActions.removeQuotes({ startPosition, finishPosition }));
  }
}
