import { Type } from '@angular/core';

export interface IToastConfig<T = any> {
  component: Type<T>;
  position?: ToastPositionType;
  autoClose?: boolean;
  duration?: number;
  panelClass?: string;
  data?: Object;
}

export enum ToastPositionEnum {
  TOP_LEFT = 'top-left',
  TOP_CENTER = 'top-center',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_RIGHT = 'bottom-right'
}

export type ToastPositionType =
  | ToastPositionEnum.TOP_LEFT
  | ToastPositionEnum.TOP_CENTER
  | ToastPositionEnum.TOP_RIGHT
  | ToastPositionEnum.BOTTOM_LEFT
  | ToastPositionEnum.BOTTOM_CENTER
  | ToastPositionEnum.BOTTOM_RIGHT;
