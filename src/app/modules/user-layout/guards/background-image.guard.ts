import { IBackgroundImageState } from '@core/redux/background-images/background-images.state';
import { IMedia } from '@core/models/media.model';
import { BackgroundImageService } from '@core/services/background-image.service';
import { filter, Observable, take, map, tap, combineLatest } from 'rxjs';
import { BackgroundImagesFacade } from '@core/redux/background-images/background-images.facade';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RequestStatusEnum } from '@core/types/request-status.type';
import { getObservableSnapshot } from '@core/rxjs-operators/helpers/get-observable-snapshot.helper';

@Injectable({ providedIn: 'root' })
export class BackgroundImageGuard implements CanActivate {
  constructor(
    private readonly backgroundImagesFacade: BackgroundImagesFacade,
    private readonly backgroundImageService: BackgroundImageService
  ) {}

  public canActivate(): Observable<boolean> {
    this.loadNextImage();

    return this.backgroundImagesFacade.currentBackgroundImageState$.pipe(
      tap(currentImageState => {
        if (BackgroundImageGuard.shouldLoadImage(currentImageState)) {
          this.backgroundImagesFacade.loadCurrentImage();
        }
      }),
      filter(({ status }) => status !== RequestStatusEnum.PENDING && status !== RequestStatusEnum.LOADING),
      take(1),
      tap(state => {
        if (state.status === RequestStatusEnum.SUCCESS) {
          this.backgroundImageService.setBackgroundImage(state.image as IMedia);
        }
      }),
      map(() => true)
    );
  }

  private static shouldLoadImage({ status }: IBackgroundImageState): boolean {
    return status === RequestStatusEnum.PENDING || status === RequestStatusEnum.ERROR ? true : false;
  }

  private loadNextImage(): void {
    const nextImageState = getObservableSnapshot(this.backgroundImagesFacade.nextBackgroundImageState$);

    if (BackgroundImageGuard.shouldLoadImage(nextImageState)) {
      this.backgroundImagesFacade.loadNextImage();
    }
  }
}
