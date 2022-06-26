import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPageComponent } from './error-page.component';
import { PageWrapperModule } from '@shared/components/page-wrapper/page-wrapper.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, RouterModule, PageWrapperModule],
  exports: [ErrorPageComponent]
})
export class ErrorPageModule {}
