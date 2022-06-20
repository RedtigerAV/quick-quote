import { NgModule } from '@angular/core';
import { CommonTipsHandler } from './handlers/common-tips.handler';
import { FirstVisitTipHandler } from './handlers/first-visit-tip.handler';
import { TIPS_HANDLER } from './handlers/tips-handler.token';
import { TipsTemplatesModule } from './templates/tips-templates.module';
import { TipsService } from './tips.service';
import { TipsStorage } from './tips.storage';

@NgModule({
  imports: [TipsTemplatesModule],
  providers: [
    TipsService,
    TipsStorage,
    { provide: TIPS_HANDLER, useClass: FirstVisitTipHandler, multi: true },
    { provide: TIPS_HANDLER, useClass: CommonTipsHandler, multi: true }
  ]
})
export class TipsModule {}
