import { IMedia } from '@core/models/media.model';
import { Nullable } from '@core/types/nullable.type';
import { RequestStatusEnum, RequestStatusType } from '@core/types/request-status.type';

export interface IBackgroundImageState {
  image: Nullable<IMedia>;
  status: RequestStatusType;
}

const initialBackgroundImageState: IBackgroundImageState = {
  image: null,
  status: RequestStatusEnum.PENDING
};

// Loading nextImage as a background proccess allow to improve
// the user experience on devices with slow connection
export interface IBackgroundImagesState {
  currentImage: IBackgroundImageState;
  nextImage: IBackgroundImageState;
}

export const initialState: IBackgroundImagesState = {
  currentImage: initialBackgroundImageState,
  nextImage: initialBackgroundImageState
};
