import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { IViewportConfig, VIEWPORT_CONFIG_INJECTION_TOKEN } from './viewport.config';

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class ViewportModule {
  public static forRoot(config: IViewportConfig): ModuleWithProviders<ViewportModule> {
    return {
      ngModule: ViewportModule,
      providers: [
        {
          provide: VIEWPORT_CONFIG_INJECTION_TOKEN,
          useValue: config
        }
      ]
    };
  }
}
