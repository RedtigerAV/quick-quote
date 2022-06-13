import { Injectable } from '@angular/core';
import { PhotosFacade } from '@core/redux/photo/photos.facade';
import { waitUntilAnimationDone } from '@core/rxjs-operators/animation-process.operator';
import { AnimationNameEnum } from '@core/services/animations/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';

@UntilDestroy()
@Injectable()
export class PhotosLoaderService {
  constructor(private readonly photosFacade: PhotosFacade) {}

  public init(): void {
    this.photosFacade.nextPhoto$
      .pipe(
        filter(() => !!this.photosFacade.selectedPhotoID),
        filter(nextQuote => !nextQuote),
        waitUntilAnimationDone(AnimationNameEnum.PHOTO_CHANGE, AnimationNameEnum.QUOTE_CHANGE),
        tap(() => this.photosFacade.loadPhotos()),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
