import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { BarItemContentComponent } from './bar-item-content.component';
import { BarItemDirective, BarItemIconDirective, BarItemTextDirective } from './bar-item.directive';

@NgModule({
  imports: [CommonModule, SvgIconsModule],
  exports: [BarItemDirective, BarItemContentComponent, BarItemIconDirective, BarItemTextDirective],
  declarations: [BarItemDirective, BarItemContentComponent, BarItemIconDirective, BarItemTextDirective],
  providers: []
})
export class BarItemModule {}
