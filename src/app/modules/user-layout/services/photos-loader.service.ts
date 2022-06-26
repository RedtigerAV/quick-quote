import { Injectable } from '@angular/core';
import { PhotosFacade } from '@core/redux/photos/photos.facade';
import { waitUntilAnimationDone } from '@core/rxjs-operators/animation-process.operator';
import { AnimationNameEnum } from '@core/services/animations/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';

@UntilDestroy()
@Injectable()
export class PhotosLoaderService {
  constructor(private readonly photosFacade: PhotosFacade) {}

  public init(): void {
    // Loading next photos after moving to the next
    this.photosFacade.selectedPhotoPosition$
      .pipe(
        filter(() => !!this.photosFacade.selectedPhotoID),
        filter(position => position === this.photosFacade.photos.length - 1),
        waitUntilAnimationDone(AnimationNameEnum.PHOTO_CHANGE, AnimationNameEnum.QUOTE_CHANGE),
        tap(() => this.photosFacade.loadPhotos()),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
