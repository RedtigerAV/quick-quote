import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrackByPipe } from './track-by.pipe';

@NgModule({
  declarations: [TrackByPipe],
  imports: [CommonModule],
  exports: [TrackByPipe]
})
export class TrackByPipeModule {}
