import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { QuotePageComponent } from './quote-page.component';
import { NextQuoteService } from './services/next-quote.service';
import { QuotesLoaderService } from './services/quotes-loader.service';

@NgModule({
  imports: [CommonModule],
  exports: [QuotePageComponent],
  declarations: [QuotePageComponent],
  providers: [QuotesLoaderService, NextQuoteService]
})
export class QuotePageModule {}
