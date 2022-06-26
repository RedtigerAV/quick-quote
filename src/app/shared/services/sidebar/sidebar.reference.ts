import { Type, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SidebarContainerRef } from './sidebar-container/sidebar-container.reference';
import { SidebarHelper } from './sidebar.helper';
import { ISidebarConfig, SidebarPositionEnum, SidebarWidthEnum } from './sidebar.interface';

export class SidebarRef<T = any, D = any> implements ISidebarConfig<T, D> {
  public readonly content!: Type<T> & TemplateRef<T>;
  public readonly data?: D;
  public readonly hasBackdrop?: boolean;
  public readonly backdropClass?: string;
  public readonly panelClass?: string;
  public readonly closeOnBackdropClick?: boolean;
  public readonly width?: string | number | SidebarWidthEnum;
  public readonly position?: SidebarPositionEnum;
  public readonly top?: number;
  public readonly bottom?: number;
  public readonly closeOnNavigation?: boolean;

  private readonly beforeClosedCallbacks: Array<(result?: any) => void>;
  private readonly afterClosedCallbacks: Array<(result?: any) => void>;
  private readonly beforeClosed$: Subject<any>;
  private readonly afterClosed$: Subject<any>;

  constructor(config: ISidebarConfig, private readonly sidebarContainerRef: SidebarContainerRef) {
    Object.assign(this, config);

    this.beforeClosedCallbacks = [];
    this.afterClosedCallbacks = [];
    this.beforeClosed$ = new Subject<any>();
    this.afterClosed$ = new Subject<any>();

    this.sidebarContainerRef.onStartClosing(result => this.startClosing(result));
    this.sidebarContainerRef.onFinishClosing(result => this.finishClosing(result));
  }

  public backdropClick(): Observable<MouseEvent> {
    return this.sidebarContainerRef.backdropClicked();
  }

  public beforeClosed(): Observable<any> {
    return this.beforeClosed$.asObservable();
  }

  public afterClosed(): Observable<any> {
    return this.afterClosed$.asObservable();
  }

  public close(result?: any): void {
    this.sidebarContainerRef.close(result);
  }

  public onBeforeClosed(callback: (result?: any) => void): void {
    this.beforeClosedCallbacks.push(callback);
  }

  public onAfterClosed(callback: (result?: any) => void): void {
    this.afterClosedCallbacks.push(callback);
  }

  public onBackdropClick(callback: (event: Event) => void): void {
    if (this.hasBackdrop) {
      this.sidebarContainerRef.addBackdropClickCallback(callback);
    }
  }

  private startClosing(result?: any): void {
    if (!this.beforeClosed$.closed) {
      this.beforeClosed$.next(result);
      this.beforeClosed$.complete();
    }

    SidebarHelper.executeCallbacks(this.beforeClosedCallbacks, result);
  }

  private finishClosing(result?: any): void {
    if (!this.afterClosed$.closed) {
      this.afterClosed$.next(result);
      this.afterClosed$.complete();
    }

    SidebarHelper.executeCallbacks(this.afterClosedCallbacks, result);
  }
}
