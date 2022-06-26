import { Component } from '@angular/core';
import { ToastRef } from '@shared/services/toaster/toaster.reference';
import { TipsEventsEnum } from '../../tips-events.enum';
import { TipsService } from '../../tips.service';

@Component({
  templateUrl: './first-visit-tip.component.html'
})
export class FirstVisitTipComponent {
  constructor(private readonly tipsService: TipsService, private readonly toastRef: ToastRef) {}

  public showCommonTips(): void {
    this.tipsService.notify(TipsEventsEnum.SHOW_COMMON_TIPS);
    this.toastRef.close();
  }
}
