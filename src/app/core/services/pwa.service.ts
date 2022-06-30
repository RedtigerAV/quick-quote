import { Platform } from '@angular/cdk/platform';
import { Inject, Injectable } from '@angular/core';
import { NAVIGATOR, WINDOW } from '@ng-web-apis/common';
import { TipsEventsEnum } from './tips/tips-events.enum';
import { TipsService } from './tips/tips.service';

export enum AddToHomeScreenPlatformEnum {
  ANDROID,
  IOS_SAFARI
}

/**
 * Service for enabling PWA features, like "Add to homescreen"
 */
@Injectable({ providedIn: 'root' })
export class PWAService {
  private addToHomeScreenEvent?: any;
  private _addToHomeScreenPlatform?: AddToHomeScreenPlatformEnum;

  constructor(
    private readonly tipsService: TipsService,
    private readonly platform: Platform,
    @Inject(WINDOW) private readonly window: Window,
    @Inject(NAVIGATOR) private readonly navigator: Navigator
  ) {}

  public get addToHomeScreenPlatform(): AddToHomeScreenPlatformEnum | undefined {
    return this._addToHomeScreenPlatform;
  }

  // https://github.com/angular/components/issues/18197
  private get isIosSafari(): boolean {
    const userAgent = navigator.userAgent;
    const webkit = !!userAgent.match(/WebKit/i);
    const notOtherBrowser = !userAgent.match(/(CriOS|FxiOS|OPiOS|mercury)/i);

    return this.platform.IOS && webkit && notOtherBrowser;
  }

  public init(): void {
    if (this.platform.ANDROID) {
      this.window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();

        this.addToHomeScreenEvent = event;
        this._addToHomeScreenPlatform = AddToHomeScreenPlatformEnum.ANDROID;
        this.tipsService.notify(TipsEventsEnum.ADD_TO_HOME_SCREEN);
      });
    }

    // https://stackoverflow.com/questions/50319831/can-i-use-add-to-home-screen-in-chrome-on-an-ios-device
    if (this.isIosSafari) {
      const isInStandaloneMode = 'standalone' in this.navigator && (<any>this.navigator)['standalone'];

      if (!isInStandaloneMode) {
        this._addToHomeScreenPlatform = AddToHomeScreenPlatformEnum.IOS_SAFARI;
        this.tipsService.notify(TipsEventsEnum.ADD_TO_HOME_SCREEN);
      }
    }
  }

  public callAddToHomeScreen(): void {
    if (this.addToHomeScreenPlatform === AddToHomeScreenPlatformEnum.ANDROID && this.addToHomeScreenEvent) {
      this.addToHomeScreenEvent.prompt();
    }
  }
}
