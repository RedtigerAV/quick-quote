import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteListComponent } from './quote-list.component';
import { TrackByPipeModule } from '@shared/pipes/track-by/track-by-pipe.module';
import { CachePipeModule } from '@shared/pipes/cache/cache-pipe.module';

@NgModule({
  declarations: [QuoteListComponent],
  imports: [CommonModule, TrackByPipeModule, CachePipeModule],
  exports: [QuoteListComponent]
})
export class QuoteListModule {}
