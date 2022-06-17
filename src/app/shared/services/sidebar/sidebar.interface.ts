import { TemplateRef, Type } from '@angular/core';

export interface ISidebarConfig<T = any, D = any> {
  content: Type<T> | TemplateRef<T>;
  data?: D;
  hasBackdrop?: boolean;
  backdropClass?: string;
  panelClass?: string;
  closeOnBackdropClick?: boolean;
  width?: number | string | SidebarWidthEnum;
  position?: SidebarPositionEnum;
  top?: number;
  bottom?: number;
  closeOnNavigation?: boolean;
}

export enum SidebarWidthEnum {
  FIT_CONTENT = 'fit-content',
  FULL_WIDTH = '100%'
}

export enum SidebarPositionEnum {
  LEFT = 'left',
  RIGHT = 'right'
}
