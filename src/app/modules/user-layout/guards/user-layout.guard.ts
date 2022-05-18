import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { MediaFacade } from '@core/redux/media/media.facade';
import { map, merge, Observable, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserLayoutGuard implements CanActivate {
  constructor(private readonly mediaFacade: MediaFacade) {}

  public canActivate(): Observable<boolean> {
    this.mediaFacade.loadImages();

    return merge(
      this.mediaFacade.loadImagesSuccessAction$.pipe(tap(({ images }) => this.mediaFacade.selectImage(images[0]?.id))),
      this.mediaFacade.loadImagesFailureAction$
    ).pipe(
      take(1),
      map(() => true)
    );
  }
}
