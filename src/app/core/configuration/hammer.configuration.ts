import { Injectable, Provider } from '@angular/core';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';

declare var Hammer: any;

@Injectable()
export class BaluHammerConfig extends HammerGestureConfig {
  override overrides = {
    pan: { enable: false },
    pinch: { enable: false },
    rotate: { enable: false },
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL }
  };
}

export const HammerGestureProvider: Provider = {
  provide: HAMMER_GESTURE_CONFIG,
  useClass: BaluHammerConfig
};
