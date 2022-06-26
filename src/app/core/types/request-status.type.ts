export enum RequestStatusEnum {
  PENDING = 'pending',
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success'
}

export type RequestStatusType =
  | RequestStatusEnum.PENDING
  | RequestStatusEnum.LOADING
  | RequestStatusEnum.ERROR
  | RequestStatusEnum.SUCCESS;
