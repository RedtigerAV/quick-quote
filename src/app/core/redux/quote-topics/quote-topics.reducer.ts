import { RequestStatusEnum } from '@core/types/request-status.type';
import { createReducer, on } from '@ngrx/store';
import { IQuoteTopicsState } from './quote-topics.state';
import * as quoteTopicsActions from './quote-topics.actions';

const initialState: IQuoteTopicsState = {
  topics: [],
  selectedTopics: [],
  status: RequestStatusEnum.PENDING
};

export const quoteTopicsReducer = createReducer(
  initialState,
  on(
    quoteTopicsActions.loadQuoteTopics,
    (state): IQuoteTopicsState => ({ ...state, status: RequestStatusEnum.LOADING })
  ),
  on(quoteTopicsActions.loadQuoteTopicsSuccess, (state, { topics }): IQuoteTopicsState => ({ ...state, topics })),
  on(
    quoteTopicsActions.loadQuoteTopicsFailure,
    (state): IQuoteTopicsState => ({ ...state, status: RequestStatusEnum.ERROR })
  ),
  on(
    quoteTopicsActions.selectQuoteTopicsSuccess,
    (state, { selectedTopics }): IQuoteTopicsState => ({ ...state, selectedTopics, status: RequestStatusEnum.SUCCESS })
  )
);
