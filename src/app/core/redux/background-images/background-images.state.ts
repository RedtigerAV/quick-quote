import { IMedia } from '@core/models/media.model';
import { Nullable } from '@core/types/nullable.type';
import { RequestStatusEnum, RequestStatusType } from '@core/types/request-status.type';

interface IBackgroundImageState {
  image: Nullable<IMedia>;
  status: RequestStatusType;
}

const initialBackgroundImageState: IBackgroundImageState = {
  image: null,
  status: RequestStatusEnum.PENDING
};

export interface IBackgroundImagesState {
  currentImage: IBackgroundImageState;
  nextImage: IBackgroundImageState;
}

export const initialState: IBackgroundImagesState = {
  currentImage: initialBackgroundImageState,
  nextImage: initialBackgroundImageState
};
