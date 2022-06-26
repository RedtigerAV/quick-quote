import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';
import { DeviceService } from '@core/services/device.service';
import { ViewportService } from '@core/services/viewport/viewport.service';
import { ToastRef } from '@shared/services/toaster/toaster.reference';

enum CommonTipsSteps {
  QUOTES_NAVIGATION,
  PERSONALIZATION,
  BOOKMARKS,
  SHARE
}

@Component({
  templateUrl: 'common-tips.component.html',
  styles: [' span { display: inline-block } svg-icon { font-size: 16px!important; transform: translateY(25%) } ']
})
export class CommonTipsComponent {
  public tipsStep = CommonTipsSteps.QUOTES_NAVIGATION;
  public readonly tipsStepsEnum = CommonTipsSteps;

  constructor(
    public readonly device: DeviceService,
    public readonly viewport: ViewportService,
    public readonly platform: Platform,
    private readonly toast: ToastRef
  ) {}

  public toNextStep(step: CommonTipsSteps): void {
    this.tipsStep = step;
  }

  public close(): void {
    this.toast.close();
  }
}
