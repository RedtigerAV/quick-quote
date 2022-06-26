import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteListComponent } from './quote-list.component';
import { TrackByPipeModule } from '@shared/pipes/track-by/track-by-pipe.module';
import { CachePipeModule } from '@shared/pipes/cache/cache-pipe.module';
import { SvgIconsModule } from '@ngneat/svg-icon';

@NgModule({
  declarations: [QuoteListComponent],
  imports: [CommonModule, TrackByPipeModule, CachePipeModule, SvgIconsModule],
  exports: [QuoteListComponent]
})
export class QuoteListModule {}
