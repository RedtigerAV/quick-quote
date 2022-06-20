import { Inject, Injectable } from '@angular/core';
import { NAVIGATOR, WINDOW } from '@ng-web-apis/common';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  public readonly isTouchDevice: boolean;

  constructor(
    @Inject(WINDOW) private readonly window: Window,
    @Inject(NAVIGATOR) private readonly navigator: Navigator
  ) {
    this.isTouchDevice = this.determineTouchDevice();
  }

  /**
   * Works on touch devices, but NOT in Chrome DevTools touch emulation
   */
  private determineTouchDevice(): boolean {
    return (
      'ontouchstart' in this.window || ((this.navigator as any).msMaxTouchPoints || this.navigator.maxTouchPoints) > 2
    );
  }
}
