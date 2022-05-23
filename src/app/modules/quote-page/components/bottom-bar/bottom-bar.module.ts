import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarItemModule } from '@shared/components/bar-item/bar-item.module';

import { BottomBarComponent } from './bottom-bar.component';

@NgModule({
  imports: [CommonModule, BarItemModule],
  declarations: [BottomBarComponent],
  exports: [BottomBarComponent, BarItemModule],
  providers: []
})
export class BottomBarModule {}
