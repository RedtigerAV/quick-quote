import { TemplateRef, Type } from '@angular/core';

export enum BasicToastTypeEnum {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error'
}

export type BasicToastType = BasicToastTypeEnum.SUCCESS | BasicToastTypeEnum.INFO | BasicToastTypeEnum.ERROR;

export interface IBasicToastData {
  title: string;
  content: string | TemplateRef<any> | Type<any>;
  type?: BasicToastTypeEnum;
}
