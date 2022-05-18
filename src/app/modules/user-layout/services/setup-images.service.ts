import { Injectable } from '@angular/core';
import { MediaFacade } from '@core/redux/media/media.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, take, tap } from 'rxjs';

@UntilDestroy()
@Injectable()
export class SetupImagesService {
  constructor(private readonly mediaFacade: MediaFacade) {}

  public setupImages(): void {
    this.mediaFacade.loadImages();

    this.mediaFacade.imageIDs$
      .pipe(
        filter(ids => !!ids.length),
        take(1),
        tap(([id]) => this.mediaFacade.selectImage(id)),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
