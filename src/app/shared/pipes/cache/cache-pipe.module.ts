import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CachePipe } from '@shared/pipes/cache/cache.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [CachePipe],
  exports: [CachePipe]
})
export class CachePipeModule {}
