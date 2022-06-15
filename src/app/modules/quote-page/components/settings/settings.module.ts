import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { SidebarContentModule } from '@shared/components/sidebar-content/sidebar-content.module';
import { CachePipeModule } from '@shared/pipes/cache/cache-pipe.module';
import { TrackByPipeModule } from '@shared/pipes/track-by/track-by-pipe.module';

import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [CommonModule, SidebarContentModule, CachePipeModule, TrackByPipeModule, SvgIconsModule, RouterModule],
  declarations: [SettingsComponent],
  providers: []
})
export class SettingsModule {}
