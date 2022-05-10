import { createReducer } from '@ngrx/store';
import { initialState, IQuotesState } from './quotes.state';

// TODO: fill reducer with handlers
export const quotesReducer = createReducer<IQuotesState>(initialState);
