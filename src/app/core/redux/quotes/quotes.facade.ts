import { selectCurrentQuoteState, selectNextQuoteState } from './quotes.selectors';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as actions from './quotes.actions';
import { IQuoteState } from './quotes.state';
import { Store, select } from '@ngrx/store';
import { IState } from '../index.state';

@Injectable({ providedIn: 'root' })
export class QuotesFacade {
  public readonly currentQuoteState$: Observable<IQuoteState>;
  public readonly nextQuoteState$: Observable<IQuoteState>;

  constructor(private readonly store: Store<IState>) {
    this.currentQuoteState$ = store.pipe(select(selectCurrentQuoteState));
    this.nextQuoteState$ = store.pipe(select(selectNextQuoteState));
  }

  public loadQuotes(): void {
    this.loadCurrentQuote();
    this.loadNextQuote();
  }

  public loadCurrentQuote(id?: string): void {
    if (!!id) {
      this.store.dispatch(actions.loadCurrentQuoteByID({ id }));

      return;
    }

    this.store.dispatch(actions.loadCurrentQuote());
  }

  public loadNextQuote(): void {
    this.store.dispatch(actions.loadNextQuote());
  }

  public goToNextQuote(): void {
    this.store.dispatch(actions.goToNextQuote());
  }
}
