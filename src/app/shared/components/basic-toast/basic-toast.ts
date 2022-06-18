import { TemplateRef } from '@angular/core';
import { IToastConfig } from '@shared/services/toaster/toaster.interface';
import { BasicToastComponent } from './basic-toast.component';
import { BasicToastType, BasicToastTypeEnum, IBasicToastData } from './basic-toast.interface';

abstract class BasicToast implements IToastConfig {
  public readonly component = BasicToastComponent;
  public readonly autoClose: boolean;
  public readonly duration = 5000;
  public readonly data: IBasicToastData;
  public abstract panelClass?: string | undefined;

  constructor(data: IBasicToastData, type: BasicToastType, autoClose: boolean) {
    this.autoClose = autoClose;
    this.data = { ...data, type };
  }
}

export class BasicToastSuccess extends BasicToast {
  public panelClass = 'basic-toast-wrapper basic-toast-wrapper--success';

  constructor(data: IBasicToastData, autoClose = true) {
    super(data, BasicToastTypeEnum.SUCCESS, autoClose);
  }
}

export class BasicToastInfo extends BasicToast {
  public panelClass = 'basic-toast-wrapper basic-toast-wrapper--info';

  constructor(data: IBasicToastData, autoClose = true) {
    super(data, BasicToastTypeEnum.INFO, autoClose);
  }
}

export class BasicToastError extends BasicToast {
  public panelClass = 'basic-toast-wrapper basic-toast-wrapper--error';

  constructor(data: IBasicToastData, autoClose = true) {
    super(data, BasicToastTypeEnum.ERROR, autoClose);
  }
}
