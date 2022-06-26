import { IQuoteTopic } from '@core/models/quote-topic.model';
import { RequestStatusType } from '@core/types/request-status.type';

export interface IQuoteTopicsState {
  topics: Array<IQuoteTopic>;
  selectedTopics: Array<IQuoteTopic>;
  status: RequestStatusType;
}
