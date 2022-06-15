import { IQuoteTopic } from '@core/models/quote-topic.model';
import { createAction, props } from '@ngrx/store';

export const loadQuoteTopics = createAction('[quote topics] [Command] Load quote topics');
export const loadQuoteTopicsSuccess = createAction(
  '[quote topics] [Query] Load quote topics -> Success',
  props<{ topics: Array<IQuoteTopic> }>()
);
export const loadQuoteTopicsFailure = createAction('[quote topics] [Query] Load quote topics -> Failure');
export const selectQuoteTopics = createAction(
  '[quote topics] [Command] Select quote topics',
  props<{ topicsIDsForSelection: Array<string> }>()
);
export const selectQuoteTopicsSuccess = createAction(
  '[quote topics] [Query] Select quote topics -> Success',
  props<{ selectedTopics: Array<IQuoteTopic> }>()
);
