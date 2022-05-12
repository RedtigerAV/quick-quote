import { RequestStatusEnum } from '@core/types/request-status.type';
import { createReducer, on } from '@ngrx/store';
import { initialState, IQuotesState } from './quotes.state';
import * as actions from './quotes.actions';

export const quotesReducer = createReducer<IQuotesState>(
  initialState,
  on(
    actions.loadCurrentQuote,
    actions.loadCurrentQuoteByID,
    (state, _): IQuotesState => ({
      ...state,
      currentQuote: { quote: null, status: RequestStatusEnum.LOADING }
    })
  ),
  on(
    actions.loadCurrentQuoteSuccess,
    (state, { quote }): IQuotesState => ({
      ...state,
      currentQuote: { quote, status: RequestStatusEnum.SUCCESS }
    })
  ),
  on(
    actions.loadCurrentQuoteFailure,
    (state, _): IQuotesState => ({
      ...state,
      currentQuote: { quote: null, status: RequestStatusEnum.ERROR }
    })
  ),
  on(
    actions.goToNextQuote,
    (state, _): IQuotesState => ({
      currentQuote: { ...state.nextQuote },
      nextQuote: { quote: null, status: RequestStatusEnum.PENDING }
    })
  ),
  on(
    actions.loadNextQuote,
    (state, _): IQuotesState => ({
      ...state,
      nextQuote: { quote: null, status: RequestStatusEnum.LOADING }
    })
  ),
  on(
    actions.loadNextQuoteSuccess,
    (state, { quote }): IQuotesState => ({
      ...state,
      nextQuote: { quote, status: RequestStatusEnum.SUCCESS }
    })
  ),
  on(
    actions.loadNextQuoteFailure,
    (state, _): IQuotesState => ({
      ...state,
      nextQuote: { quote: null, status: RequestStatusEnum.ERROR }
    })
  )
);
