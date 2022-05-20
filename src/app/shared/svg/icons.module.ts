import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { qqQuoteIcon } from './icons/quote';

@NgModule({
  imports: [
    SvgIconsModule.forRoot({
      icons: [qqQuoteIcon]
    })
  ],
  exports: [SvgIconsModule]
})
export class IconsModule {}
