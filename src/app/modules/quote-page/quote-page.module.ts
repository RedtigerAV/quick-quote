import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { QuotePageComponent } from './quote-page.component';

@NgModule({
  imports: [CommonModule],
  exports: [QuotePageComponent],
  declarations: [QuotePageComponent],
  providers: []
})
export class QuotePageModule {}
