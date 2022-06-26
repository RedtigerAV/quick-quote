import { Injectable } from '@angular/core';
import { PhotosApiService } from '@core/api/photos-api.service';
import { PhotosFacade } from '@core/redux/photos/photos.facade';
import { take } from 'rxjs';

@Injectable()
export class DownloadPhotoService {
  constructor(private readonly photosFacade: PhotosFacade, private readonly photosApi: PhotosApiService) {}

  public triggerDownload(): void {
    if (!this.photosFacade.selectedPhoto) {
      return;
    }

    const { id, ixid } = this.photosFacade.selectedPhoto;

    this.photosApi.v1PhotosDownload(id, { ixid }).pipe(take(1)).subscribe();
  }
}
