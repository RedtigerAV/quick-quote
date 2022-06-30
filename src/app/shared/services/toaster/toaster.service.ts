import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Inject, Injectable, OnDestroy } from '@angular/core';
import { Nullable } from '@core/types/nullable.type';
import { ToasterContainerComponent } from './toaster-container/toaster-container.component';
import { IToastConfig } from './toaster.interface';
import { ToastRef } from './toaster.reference';
import { TOAST_CONFIG } from './toaster.token';

const TOAST_CONTAINER_CLASS_NAME = 'qq-toast-container';

/**
 * Service for dynamic rendering of a component or template in the floating toast according to the configuration
 */
@Injectable()
export class ToasterService implements OnDestroy {
  private overlayRef?: OverlayRef;
  private containerRef?: Nullable<ComponentRef<ToasterContainerComponent>>;
  private _defaultConfig: Partial<IToastConfig> = {};

  constructor(@Inject(TOAST_CONFIG) private readonly _config: IToastConfig, private readonly overlay: Overlay) {}

  public updateDefaultConfig(config: Partial<IToastConfig>): void {
    this._defaultConfig = config;
  }

  /**
   * Open floating toast
   * @param config current configuration
   * @returns
   */
  public open(config: IToastConfig): ToastRef {
    const currentConfig = { ...this._config, ...this._defaultConfig, ...config };

    if (!this.containerRef) {
      this.attach();
    }

    const toast = new ToastRef(currentConfig);

    this.containerRef?.instance.addToast(toast);

    toast.onClose(() => this.containerRef?.instance.deleteToast(toast));

    return toast;
  }

  private attach(): void {
    this.overlayRef = this.overlay.create({
      panelClass: TOAST_CONTAINER_CLASS_NAME
    });
    this.containerRef = this.overlayRef.attach(new ComponentPortal(ToasterContainerComponent));
  }

  private detach(): void {
    if (this.containerRef) {
      this.overlayRef?.detach();
      this.containerRef.destroy();
      this.containerRef = null;
    }
  }

  public ngOnDestroy(): void {
    this.detach();
  }
}
