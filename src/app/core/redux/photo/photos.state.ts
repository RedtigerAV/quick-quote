import { IPhoto } from '@core/models/photo.model';
import { Nullable } from '@core/types/nullable.type';

export interface IPhotosState {
  photos: Array<IPhoto>;
  selectedPhotoID: Nullable<string>;
}
