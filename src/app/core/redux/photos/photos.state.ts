import { IPhoto } from '@core/models/photo.model';

export interface IPhotosState {
  photos: Array<IPhoto>;
  currentPosition: number;
}
