import { combineLatest, filter, map, Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IPhoto } from '@core/models/photo.model';
import { PhotosFacade } from '@core/redux/photos/photos.facade';
import { SetupPhotosService } from './services/setup-photos.service';
import { PhotosLoaderService } from './services/photos-loader.service';
import { BrightnessLevelEnum, ColorsHelper } from '@shared/helpers/colors.helper';
import { ViewportService } from '@core/services/viewport/viewport.service';
import { AppRoutePath } from 'src/app/app.route-path';
import { BackgroundAnimationService } from '@core/services/animations/background-animation.service';
import { AnimationProcessService } from '@core/services/animations/animation-process.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { AnimationNameEnum } from '@core/services/animations/animations';
import { waitUntilAnimationDone } from '@core/rxjs-operators/animation-process.operator';
import { HtmlToImageService } from '@core/services/html-to-image/html-to-image.service';

const PHOTO_POSITION_OFFSET = 1;

@UntilDestroy()
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      state('active', style({ opacity: 1 })),
      state('inactive', style({ opacity: 0 })),
      transition('active <=> inactive, void => active', [animate('1s ease-in-out')])
    ])
  ]
})
export class UserLayoutComponent implements OnInit {
  public readonly photos$: Observable<Array<IPhoto>>;
  public readonly selectedPhoto$: Observable<IPhoto>;
  public readonly currentPhotoPosition$: Observable<number>;
  public readonly appRoutePathEnum = AppRoutePath;
  public readonly unsplashLink = 'https://unsplash.com/?utm_source=quick-quote&utm_medium=referral';
  public readonly skipHtmlToImage = HtmlToImageService.skipHtmlToImageClass;

  private readonly appName = 'quick-quote';

  constructor(
    public readonly viewport: ViewportService,
    private readonly animationProcess: AnimationProcessService,
    private readonly photosFacade: PhotosFacade,
    private readonly backgroundAnimation: BackgroundAnimationService,
    private readonly setupPhotosService: SetupPhotosService,
    private readonly photosLoaderService: PhotosLoaderService
  ) {
    this.photos$ = combineLatest([
      photosFacade.photos$.pipe(filter(photos => !!photos?.length)),
      photosFacade.selectedPhotoPosition$.pipe(filter(position => position !== null))
    ]).pipe(
      waitUntilAnimationDone(AnimationNameEnum.PHOTO_CHANGE, AnimationNameEnum.QUOTE_CHANGE),
      map(([photos, position]) =>
        photos.slice(
          Math.max(0, (position as number) - PHOTO_POSITION_OFFSET),
          Math.min(photos.length, (position as number) + PHOTO_POSITION_OFFSET + 1)
        )
      )
    );
    this.selectedPhoto$ = photosFacade.selectedPhoto$.pipe(filter(Boolean));
    this.currentPhotoPosition$ = combineLatest([
      this.photos$,
      photosFacade.selectedPhotoID$.pipe(filter(Boolean))
    ]).pipe(map(([photos, selectedID]) => photos.findIndex(({ id }) => id === selectedID)));
  }

  public ngOnInit(): void {
    // TODO: проверить что при смене компонента подписки не пересоздаются
    this.photosLoaderService.init();
    this.setupPhotosService.setupPhotos();
    this.setupBackgroundAnimation();
  }

  public animationStart(event: AnimationEvent): void {
    if (event.fromState === 'inactive' && event.toState === 'active') {
      this.animationProcess.animationStart(AnimationNameEnum.PHOTO_CHANGE);
    }
  }

  public animationDone(event: AnimationEvent): void {
    if (event.fromState === 'inactive' && event.toState === 'active') {
      this.animationProcess.animationDone(AnimationNameEnum.PHOTO_CHANGE);
    }
  }

  public getPhotoAuthorLink(photo: IPhoto): string {
    const link = photo.user.link;

    return `${link}?utm_source=${this.appName}&utm_medium=referral`;
  }

  public getMenuTextColor(photo: IPhoto): string {
    const forDarkBG = 'var(--qq-color-text-main)';
    const forLightBG = 'var(--qq-color-text-contrast)';

    if (!photo) {
      return forDarkBG;
    }

    const darkenColor = ColorsHelper.lightenDarkenHex(photo.color, -70);
    const backgroundRGB = ColorsHelper.hexToRGB(darkenColor);

    if (!backgroundRGB) {
      return forDarkBG;
    }

    const bgBrightness = ColorsHelper.getBrightnessLevel(backgroundRGB);

    return bgBrightness === BrightnessLevelEnum.LIGHT ? forLightBG : forDarkBG;
  }

  private setupBackgroundAnimation(): void {
    this.photosFacade.selectedPhoto$.pipe(untilDestroyed(this)).subscribe(photo => {
      if (!photo) {
        this.backgroundAnimation.turnOnAnimation();
      } else {
        this.backgroundAnimation.turnOffAnimation();
      }
    });
  }
}
