import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { LogoComponent } from './logo.component';

@NgModule({
  imports: [CommonModule, SvgIconsModule],
  exports: [LogoComponent],
  declarations: [LogoComponent]
})
export class LogoModule {}
