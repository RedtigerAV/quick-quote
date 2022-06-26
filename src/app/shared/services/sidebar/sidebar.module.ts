import { OverlayModule } from '@angular/cdk/overlay';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SidebarContainerComponent } from './sidebar-container/sidebar-container.component';
import { ISidebarConfig } from './sidebar.interface';
import { SidebarService } from './sidebar.service';
import { SIDEBAR_CONFIG } from './sidebar.token';

@NgModule({
  imports: [CommonModule, CdkScrollableModule, OverlayModule],
  declarations: [SidebarContainerComponent],
  providers: [
    SidebarService,
    {
      provide: SIDEBAR_CONFIG,
      useValue: {}
    }
  ]
})
export class SidebarModule {
  public static forRoot(config: Partial<ISidebarConfig>): ModuleWithProviders<SidebarModule> {
    return {
      ngModule: SidebarModule,
      providers: [
        {
          provide: SIDEBAR_CONFIG,
          useValue: config || {}
        }
      ]
    };
  }
}
