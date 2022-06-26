import { InjectionToken } from '@angular/core';
import { IToastConfig } from './toaster.interface';

export const TOAST_CONFIG = new InjectionToken<IToastConfig>('TOAST_CONFIG');
export const TOAST_DATA = new InjectionToken<Object>('TOAST_DATA');
