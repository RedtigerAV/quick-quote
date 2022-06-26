import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutPageRoutingModule } from './about-page-routing.module';
import { AboutPageComponent } from './about-page.component';
import { PageWrapperModule } from '@shared/components/page-wrapper/page-wrapper.module';

@NgModule({
  declarations: [AboutPageComponent],
  imports: [CommonModule, AboutPageRoutingModule, PageWrapperModule]
})
export class AboutPageModule {}
