import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrackByPipeModule } from '@shared/pipes/track-by/track-by-pipe.module';

import { QuotePageComponent } from './quote-page.component';
import { QuoteListModule } from './components/quote-list/quote-list.module';
import { BottomBarModule } from './components/bottom-bar/bottom-bar.module';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { LockedPipeModule } from '@shared/pipes/locked/locked-pipe.module';
import { SocialNetworksModule } from './components/social-networks/social-networks.module';
import { BarItemModule } from '@shared/components/bar-item/bar-item.module';
import { BookmarksModule } from './components/bookmarks/bookmarks.module';
import { TimerModule } from '@shared/components/timer/timer.module';
import { SettingsModule } from './components/settings/settings.module';
import { BookmarksService } from './services/bookmarks.service';
import { DownloadPhotoService } from './services/dowload-photo.service';
import { NextQuoteService } from './services/next-quote.service';
import { PreviousQuoteService } from './services/previous-quote.service';
import { QuotesLoaderService } from './services/quotes-loader.service';
import { QuotesMediator } from './services/quotes.mediator';
import { SettingsService } from './services/settings.service';
import { SlideshowService } from './services/slideshow.service';

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
    SettingsModule,
    TimerModule
  ],
  exports: [QuotePageComponent],
  declarations: [QuotePageComponent],
  providers: [
    QuotesMediator,
    NextQuoteService,
    PreviousQuoteService,
    QuotesLoaderService,
    DownloadPhotoService,
    BookmarksService,
    SlideshowService,
    SettingsService
  ]
})
export class QuotePageModule {}
