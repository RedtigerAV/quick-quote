import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { BarItemComponent } from './bar-item.component';
import { BarItemIconDirective, BarItemTextDirective } from './bar-item.directive';

@NgModule({
  imports: [CommonModule, SvgIconsModule],
  exports: [BarItemComponent, BarItemIconDirective, BarItemTextDirective],
  declarations: [BarItemComponent, BarItemIconDirective, BarItemTextDirective],
  providers: []
})
export class BarItemModule {}
