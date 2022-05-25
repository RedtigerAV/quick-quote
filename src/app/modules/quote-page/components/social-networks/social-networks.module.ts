import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { BarItemModule } from '@shared/components/bar-item/bar-item.module';
import { ShareModule as ShareButtonsModule } from 'ngx-sharebuttons';

import { SocialNetworksComponent } from './social-networks.component';

@NgModule({
  imports: [CommonModule, BarItemModule, SvgIconsModule, ShareButtonsModule],
  exports: [SocialNetworksComponent],
  declarations: [SocialNetworksComponent]
})
export class SocialNetworksModule {}
