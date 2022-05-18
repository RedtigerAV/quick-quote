import { IMedia } from '@core/models/media.model';
import { Nullable } from '@core/types/nullable.type';

export interface IMediaState {
  images: Array<IMedia>;
  selectedImageID: Nullable<string>;
}
