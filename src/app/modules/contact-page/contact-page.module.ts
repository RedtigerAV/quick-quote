import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactPageRoutingModule } from './contact-page-routing.module';
import { ContactPageComponent } from './contact-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '@shared/components/forms/input/input.module';
import { TextareaModule } from '@shared/components/forms/textarea/textarea.module';
import { PageWrapperModule } from '@shared/components/page-wrapper/page-wrapper.module';

@NgModule({
  declarations: [ContactPageComponent],
  imports: [
    CommonModule,
    ContactPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
    TextareaModule,
    PageWrapperModule
  ]
})
export class ContactPageModule {}
