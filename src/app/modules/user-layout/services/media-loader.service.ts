import { Injectable } from '@angular/core';
import { MediaFacade } from '@core/redux/media/media.facade';
import { waitUntilAnimationDone } from '@core/rxjs-operators/animation-process.operator';
import { AnimationNameEnum } from '@core/services/animations/animations';
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
        waitUntilAnimationDone(AnimationNameEnum.IMAGE_CHANGE, AnimationNameEnum.QUOTE_CHANGE),
        tap(() => this.mediaFacade.loadImages()),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
