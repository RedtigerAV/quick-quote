import { NgModule } from '@angular/core';
import { LockedPipe } from './locked.pipe';

@NgModule({
  exports: [LockedPipe],
  declarations: [LockedPipe]
})
export class LockedPipeModule {}
