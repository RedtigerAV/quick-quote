import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrackByPipeModule } from '@shared/pipes/track-by/track-by-pipe.module';

import { QuotePageComponent } from './quote-page.component';
import { NextQuoteService } from './services/next-quote.service';
import { QuoteListModule } from './components/quote-list/quote-list.module';
import { PreviousQuoteService } from './services/previous-quote.service';
import { BottomBarModule } from './components/bottom-bar/bottom-bar.module';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { LockedPipeModule } from '@shared/pipes/locked/locked-pipe.module';
import { HtmlToImageService } from '@shared/services/html-to-image.service';
import { SocialNetworksModule } from './components/social-networks/social-networks.module';
import { BarItemModule } from '@shared/components/bar-item/bar-item.module';
import { BookmarksModule } from './components/bookmarks/bookmarks.module';
import { TimerModule } from '@shared/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    TrackByPipeModule,
    QuoteListModule,
    BottomBarModule,
    SvgIconsModule,
    LockedPipeModule,
    SocialNetworksModule,
    BarItemModule,
    BookmarksModule,
    TimerModule
  ],
  exports: [QuotePageComponent],
  declarations: [QuotePageComponent],
  providers: [NextQuoteService, PreviousQuoteService, HtmlToImageService]
})
export class QuotePageModule {}
