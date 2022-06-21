import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPageRoutingModule } from './error-page-routing.module';
import { ErrorPageComponent } from './error-page.component';
import { PageWrapperModule } from '@shared/components/page-wrapper/page-wrapper.module';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, ErrorPageRoutingModule, PageWrapperModule]
})
export class ErrorPageModule {}
