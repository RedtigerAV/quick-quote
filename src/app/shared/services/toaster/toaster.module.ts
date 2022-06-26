import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ToasterContainerModule } from './toaster-container/toaster-container.module';
import { IToastConfig } from './toaster.interface';
import { ToasterService } from './toaster.service';
import { TOAST_CONFIG } from './toaster.token';

@NgModule({
  imports: [CommonModule, ToasterContainerModule, OverlayModule],
  exports: [],
  providers: [
    ToasterService,
    {
      provide: TOAST_CONFIG,
      useValue: {}
    }
  ]
})
export class ToasterModule {
  constructor(@Optional() @SkipSelf() parentModule: ToasterModule) {
    if (parentModule) {
      throw new Error('ToasterModule is already loaded. Import it in the root module only');
    }
  }

  public static forRoot(config: Partial<IToastConfig>): ModuleWithProviders<ToasterModule> {
    return {
      ngModule: ToasterModule,
      providers: [
        {
          provide: TOAST_CONFIG,
          useValue: config || {}
        }
      ]
    };
  }
}
