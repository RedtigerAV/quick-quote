import { InjectionToken } from '@angular/core';

export const VIEWPORT_CONFIG_INJECTION_TOKEN = new InjectionToken('QQ_VIEWPORT_CONFIG');

export interface IViewportConfig {
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

export enum ViewportSize {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop'
}
