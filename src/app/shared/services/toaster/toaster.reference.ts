import { Type } from '@angular/core';
import { Nullable } from '@core/types/nullable.type';
import { Observable, Subject } from 'rxjs';
import { IToastConfig, ToastPositionType } from './toaster.interface';

export class ToastRef<T = any> implements IToastConfig<T> {
  private static counter = 0;

  public readonly id: number;
  public readonly component!: Type<any>;
  public readonly position?: ToastPositionType;
  public readonly autoClose?: boolean;
  public readonly duration?: number;
  public readonly panelClass?: string;
  public readonly data?: Object;

  private readonly closeCallbacks: ((result?: any) => void)[];
  private readonly afterClosed$ = new Subject<any>();
  private readonly closeTimeout: Nullable<any>;

  constructor(config: IToastConfig) {
    this.id = ToastRef.counter++;

    Object.assign(this, config);

    this.closeCallbacks = [];
    this.closeTimeout = this.setupCloseTimeout();
  }

  public afterClosed(): Observable<any> {
    return this.afterClosed$.asObservable();
  }

  public close(result?: any): void {
    if (!this.afterClosed$.closed) {
      this.afterClosed$.next(result);
      this.afterClosed$.complete();
    }

    if (this.closeCallbacks.length) {
      this.closeCallbacks.forEach(callback => {
        callback(result);
      });
    }

    this.clearCloseTimeout();
  }

  public onClose(closeCallback: (result?: any) => void): void {
    this.closeCallbacks.push(closeCallback);
  }

  private setupCloseTimeout(): Nullable<any> {
    if (this.autoClose && this.duration && this.duration > 0) {
      return setTimeout(() => this.close(), this.duration);
    }

    return null;
  }

  private clearCloseTimeout(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
  }
}
