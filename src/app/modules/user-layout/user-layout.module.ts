import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrackByPipeModule } from '@shared/pipes/track-by/track-by-pipe.module';
import { UserLayoutComponent } from './user-layout.component';
import { PhotosLoaderService } from './services/photos-loader.service';
import { SidebarModule } from '@shared/services/sidebar/sidebar.module';
import { SidebarPositionEnum } from '@shared/services/sidebar/sidebar.interface';
import { LogoModule } from '@shared/components/logo/logo.module';
import { CachePipeModule } from '@shared/pipes/cache/cache-pipe.module';
import { SvgIconsModule } from '@ngneat/svg-icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TrackByPipeModule,
    LogoModule,
    CachePipeModule,
    SvgIconsModule,
    SidebarModule.forRoot({
      position: SidebarPositionEnum.RIGHT,
      closeOnBackdropClick: true,
      hasBackdrop: true,
      closeOnNavigation: true,
      panelClass: 'sidebar-panel'
    })
  ],
  exports: [UserLayoutComponent],
  declarations: [UserLayoutComponent],
  providers: [PhotosLoaderService]
})
export class UserLayoutModule {}
