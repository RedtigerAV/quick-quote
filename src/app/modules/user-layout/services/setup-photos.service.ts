import { Injectable } from '@angular/core';
import { PhotosFacade } from '@core/redux/photos/photos.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, take, tap } from 'rxjs';

@UntilDestroy()
@Injectable()
export class SetupPhotosService {
  constructor(private readonly photosFacade: PhotosFacade) {}

  public setupPhotos(): void {
    this.photosFacade.loadPhotos();

    this.photosFacade.photoIDs$
      .pipe(
        filter(ids => !!ids.length),
        take(1),
        tap(([id]) => this.photosFacade.selectPhotos(id)),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
