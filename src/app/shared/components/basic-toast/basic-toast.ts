import { IToastConfig } from '@shared/services/toaster/toaster.interface';
import { BasicToastComponent } from './basic-toast.component';
import { BasicToastType, BasicToastTypeEnum, IBasicToastData } from './basic-toast.interface';

abstract class BasicToast implements IToastConfig {
  public readonly component = BasicToastComponent;
  public readonly autoClose = false;
  public readonly duration = 5000;
  public readonly data: IBasicToastData;

  constructor(text: string, type: BasicToastType) {
    this.data = { text, type };
  }
}

export class BasicToastSuccess extends BasicToast {
  constructor(text: string) {
    super(text, BasicToastTypeEnum.SUCCESS);
  }
}

export class BasicToastInfo extends BasicToast {
  constructor(text: string) {
    super(text, BasicToastTypeEnum.INFO);
  }
}

export class BasicToastError extends BasicToast {
  constructor(text: string) {
    super(text, BasicToastTypeEnum.ERROR);
  }
}
