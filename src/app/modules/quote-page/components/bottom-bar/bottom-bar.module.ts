import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BottomBarComponent } from './bottom-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BottomBarComponent],
  exports: [BottomBarComponent],
  providers: []
})
export class BottomBarModule {}
