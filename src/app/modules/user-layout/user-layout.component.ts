import { combineLatest, filter, map, Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IMedia } from '@core/models/media.model';
import { MediaFacade } from '@core/redux/media/media.facade';
import { SetupImagesService } from './services/setup-images.service';
import { MediaLoaderService } from './services/media-loader.service';
import { BrightnessLevelEnum, ColorsHelper } from '@shared/helpers/colors.helper';
import { ViewportService } from '@core/services/viewport/viewport.service';
import { AppRoutePath } from 'src/app/app.route-path';
import { BackgroundAnimationService } from '@core/services/animations/background-animation.service';
import { AnimationProcessService } from '@core/services/animations/animation-process.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { globalConfig } from '@core/global/global.config';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { AnimationNameEnum } from '@core/services/animations/animations';
import { waitUntilAnimationDone } from '@core/rxjs-operators/animation-process.operator';

const IMAGE_POSITION_OFFSET = 1;

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
  public readonly images$: Observable<Array<IMedia>>;
  public readonly selectedImage$: Observable<IMedia>;
  public readonly currentImagePosition$: Observable<number>;
  public readonly appRoutePathEnum = AppRoutePath;
  public readonly unsplashLink = 'https://unsplash.com/?utm_source=quick-quote&utm_medium=referral';
  public readonly skipHtmlToImage = globalConfig.skipHtmlToImageClass;

  private readonly appName = 'quick-quote';

  constructor(
    public readonly viewport: ViewportService,
    private readonly animationProcess: AnimationProcessService,
    private readonly mediaFacade: MediaFacade,
    private readonly backgroundAnimation: BackgroundAnimationService,
    private readonly setupImagesService: SetupImagesService,
    private readonly mediaLoaderService: MediaLoaderService
  ) {
    this.images$ = combineLatest([
      mediaFacade.images$.pipe(filter(images => !!images?.length)),
      mediaFacade.selectedImagePosition$.pipe(filter(position => position !== null))
    ]).pipe(
      waitUntilAnimationDone(AnimationNameEnum.IMAGE_CHANGE, AnimationNameEnum.QUOTE_CHANGE),
      map(([images, position]) =>
        images.slice(
          Math.max(0, (position as number) - IMAGE_POSITION_OFFSET),
          Math.min(images.length, (position as number) + IMAGE_POSITION_OFFSET + 1)
        )
      )
    );
    this.selectedImage$ = mediaFacade.selectedImage$.pipe(filter(Boolean));
    this.currentImagePosition$ = combineLatest([this.images$, mediaFacade.selectedImageID$.pipe(filter(Boolean))]).pipe(
      map(([images, selectedID]) => images.findIndex(({ id }) => id === selectedID))
    );
  }

  public ngOnInit(): void {
    this.mediaLoaderService.init();
    this.setupImagesService.setupImages();
    this.setupBackgroundAnimation();
  }

  public animationStart(event: AnimationEvent): void {
    if (event.fromState === 'inactive' && event.toState === 'active') {
      this.animationProcess.animationStart(AnimationNameEnum.IMAGE_CHANGE);
    }
  }

  public animationDone(event: AnimationEvent): void {
    if (event.fromState === 'inactive' && event.toState === 'active') {
      this.animationProcess.animationDone(AnimationNameEnum.IMAGE_CHANGE);
    }
  }

  public getImageAuthorLink(image: IMedia): string {
    const link = image.user.link;

    return `${link}?utm_source=${this.appName}&utm_medium=referral`;
  }

  public getMenuTextColor(image: IMedia): string {
    const forDarkBG = 'var(--qq-color-text-main)';
    const forLightBG = 'var(--qq-color-text-contrast)';

    if (!image) {
      return forDarkBG;
    }

    const darkenColor = ColorsHelper.lightenDarkenHex(image.color, -70);
    const backgroundRGB = ColorsHelper.hexToRGB(darkenColor);

    if (!backgroundRGB) {
      return forDarkBG;
    }

    const bgBrightness = ColorsHelper.getBrightnessLevel(backgroundRGB);

    return bgBrightness === BrightnessLevelEnum.LIGHT ? forLightBG : forDarkBG;
  }

  private setupBackgroundAnimation(): void {
    this.mediaFacade.selectedImage$.pipe(untilDestroyed(this)).subscribe(image => {
      if (!image) {
        this.backgroundAnimation.turnOnAnimation();
      } else {
        this.backgroundAnimation.turnOffAnimation();
      }
    });
  }
}
