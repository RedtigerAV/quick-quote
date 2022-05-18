import { Injectable } from '@angular/core';
import { MediaFacade } from '@core/redux/media/media.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';

@UntilDestroy()
@Injectable()
export class MediaLoaderService {
  constructor(private readonly mediaFacade: MediaFacade) {}

  public init(): void {
    this.mediaFacade.nextImage$
      .pipe(
        filter(() => !!this.mediaFacade.selectedImageID),
        filter(nextQuote => !nextQuote),
        tap(() => this.mediaFacade.loadImages()),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
