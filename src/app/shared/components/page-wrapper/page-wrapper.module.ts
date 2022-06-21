import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { PageWrapperComponent } from './page-wrapper.component';
import { PageWrapperDescriptionDirective, PageWrapperTitleDirective } from './page-wrapper.directive';

@NgModule({
  imports: [CommonModule, RouterModule, SvgIconsModule],
  exports: [PageWrapperComponent, PageWrapperTitleDirective, PageWrapperDescriptionDirective],
  declarations: [PageWrapperComponent, PageWrapperTitleDirective, PageWrapperDescriptionDirective]
})
export class PageWrapperModule {}
