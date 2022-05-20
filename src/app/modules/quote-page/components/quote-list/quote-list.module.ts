import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteListComponent } from './quote-list.component';
import { TrackByPipeModule } from '@shared/pipes/track-by/track-by-pipe.module';

@NgModule({
  declarations: [QuoteListComponent],
  imports: [CommonModule, TrackByPipeModule],
  exports: [QuoteListComponent]
})
export class QuoteListModule {}
