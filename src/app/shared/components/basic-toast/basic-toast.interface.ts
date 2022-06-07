export enum BasicToastTypeEnum {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error'
}

export type BasicToastType = BasicToastTypeEnum.SUCCESS | BasicToastTypeEnum.INFO | BasicToastTypeEnum.ERROR;

export interface IBasicToastData {
  text: string;
  type: BasicToastTypeEnum;
}
