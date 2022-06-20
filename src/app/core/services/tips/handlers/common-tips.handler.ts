import { Injectable } from '@angular/core';
import { BasicToastInfo } from '@shared/components/basic-toast/basic-toast';
import { CommonTipsComponent } from '../templates/common-tips/common-tips.component';
import { TipsEventsEnum } from '../tips-events.enum';
import { TipHandler } from './tip.handler';

@Injectable()
export class CommonTipsHandler extends TipHandler {
  public name = 'common-tips';

  public canHandle(event: TipsEventsEnum): boolean {
    return event === TipsEventsEnum.SHOW_COMMON_TIPS;
  }

  public handle(): void {
    this.toaster.open(new BasicToastInfo({ title: 'Tips and tricks', content: CommonTipsComponent }, false));
  }
}
