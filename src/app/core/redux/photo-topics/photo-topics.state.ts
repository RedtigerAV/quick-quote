import { IPhotoTopic } from '@core/models/photo-topic.model';
import { RequestStatusType } from '@core/types/request-status.type';

export interface IPhotoTopicsState {
  topics: Array<IPhotoTopic>;
  selectedTopics: Array<IPhotoTopic>;
  status: RequestStatusType;
}
