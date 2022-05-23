import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrackByPipeModule } from '@shared/pipes/track-by/track-by-pipe.module';

import { QuotePageComponent } from './quote-page.component';
import { NextQuoteService } from './services/next-quote.service';
import { QuotesLoaderService } from './services/quotes-loader.service';
import { QuoteListModule } from './components/quote-list/quote-list.module';
import { PreviousQuoteService } from './services/previous-quote.service';
import { BottomBarModule } from './components/bottom-bar/bottom-bar.module';
import { SvgIconsModule } from '@ngneat/svg-icon';

@NgModule({
  imports: [CommonModule, TrackByPipeModule, QuoteListModule, BottomBarModule, SvgIconsModule],
  exports: [QuotePageComponent],
  declarations: [QuotePageComponent],
  providers: [QuotesLoaderService, NextQuoteService, PreviousQuoteService]
})
export class QuotePageModule {}
