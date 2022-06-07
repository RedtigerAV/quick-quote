import { Injectable } from '@angular/core';
import { MediaApiService } from '@core/api/media-api.service';
import { MediaFacade } from '@core/redux/media/media.facade';
import { take } from 'rxjs';

@Injectable()
export class DownloadImageService {
  constructor(private readonly mediaFacade: MediaFacade, private readonly mediaApi: MediaApiService) {}

  public triggerDownload(): void {
    if (!this.mediaFacade.selectedImage) {
      return;
    }

    const { download_location } = this.mediaFacade.selectedImage;

    this.mediaApi.v1MediaDownload({ download_location }).pipe(take(1)).subscribe();
  }
}