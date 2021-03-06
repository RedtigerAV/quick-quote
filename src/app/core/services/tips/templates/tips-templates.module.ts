import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { CommonTipsComponent } from './common-tips/common-tips.component';
import { FirstVisitTipComponent } from './first-visit-tip/first-visit-tip.component';
import { AddToHomeScreenComponent } from './add-to-home-screen/add-to-home-screen.component';

@NgModule({
  imports: [CommonModule, SvgIconsModule],
  declarations: [FirstVisitTipComponent, CommonTipsComponent, AddToHomeScreenComponent]
})
export class TipsTemplatesModule {}
