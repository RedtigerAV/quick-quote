import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CachePipeModule } from '@shared/pipes/cache/cache-pipe.module';
import { TrackByPipeModule } from '@shared/pipes/track-by/track-by-pipe.module';

import { ToasterContainerComponent } from './toaster-container.component';

@NgModule({
  imports: [CommonModule, TrackByPipeModule, CachePipeModule],
  declarations: [ToasterContainerComponent]
})
export class ToasterContainerModule {}
