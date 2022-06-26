import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { BasicToastComponent } from './basic-toast.component';

@NgModule({
  imports: [CommonModule, SvgIconsModule],
  declarations: [BasicToastComponent],
  exports: [BasicToastComponent]
})
export class BasicToastModule {}
