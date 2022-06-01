import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrackByPipeModule } from '@shared/pipes/track-by/track-by-pipe.module';
import { UserLayoutComponent } from './user-layout.component';
import { SetupImagesService } from './services/setup-images.service';
import { MediaLoaderService } from './services/media-loader.service';
import { SidebarModule } from '@shared/services/sidebar/sidebar.module';
import { SidebarPositionEnum } from '@shared/services/sidebar/sidebar.interface';
import { LogoModule } from '@shared/components/logo/logo.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TrackByPipeModule,
    LogoModule,
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
  providers: [SetupImagesService, MediaLoaderService]
})
export class UserLayoutModule {}
