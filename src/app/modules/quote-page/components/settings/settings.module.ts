import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { SidebarContentModule } from '@shared/components/sidebar-content/sidebar-content.module';

import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [CommonModule, SidebarContentModule, SvgIconsModule],
  declarations: [SettingsComponent],
  providers: []
})
export class SettingsModule {}
