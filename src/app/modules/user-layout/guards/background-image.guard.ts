import { IMedia } from '@core/models/media.model';
import { BackgroundImageService } from '@core/services/background-image.service';
import { filter, Observable, take, map, tap } from 'rxjs';
import { BackgroundImagesFacade } from '@core/redux/background-images/background-images.facade';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RequestStatusEnum } from '@core/types/request-status.type';

@Injectable({ providedIn: 'root' })
export class BackgroundImageGuard implements CanActivate {
  constructor(
    private readonly backgroundImagesFacade: BackgroundImagesFacade,
    private readonly backgroundImageService: BackgroundImageService
  ) {}

  public canActivate(): Observable<boolean> {
    this.backgroundImagesFacade.loadImages();

    return this.backgroundImagesFacade.currentBackgroundImageState$.pipe(
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
}
