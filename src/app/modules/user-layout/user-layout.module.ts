import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrackByPipeModule } from '@shared/pipes/track-by/track-by-pipe.module';
import { UserLayoutComponent } from './user-layout.component';

@NgModule({
  imports: [CommonModule, RouterModule, TrackByPipeModule],
  exports: [UserLayoutComponent],
  declarations: [UserLayoutComponent],
  providers: []
})
export class UserLayoutModule {}
