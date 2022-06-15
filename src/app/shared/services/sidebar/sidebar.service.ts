import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Inject, Injectable, Injector } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Nullable } from '@core/types/nullable.type';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { SidebarContainerComponent } from './sidebar-container/sidebar-container.component';
import { SidebarContainerRef } from './sidebar-container/sidebar-container.reference';
import { ISidebarConfig } from './sidebar.interface';
import { SidebarRef } from './sidebar.reference';
import { SIDEBAR_CONFIG, SIDEBAR_DATA } from './sidebar.token';

@UntilDestroy()
@Injectable()
export class SidebarService {
  private sidebarContainerRef?: Nullable<SidebarContainerRef>;
  private overlayRef?: OverlayRef;
  private containerRef?: Nullable<ComponentRef<SidebarContainerComponent>>;
  private readonly sidebarDestroy$ = new Subject<void>();

  constructor(
    @Inject(SIDEBAR_CONFIG) private readonly defaultConfig: ISidebarConfig,
    private readonly overlay: Overlay,
    private readonly router: Router,
    private readonly injector: Injector
  ) {}

  public open<T = any, D = any>(config: ISidebarConfig<T, D>): SidebarRef<T, D> {
    const currentConfig: ISidebarConfig = { ...this.defaultConfig, ...config };
    const sidebarContainerRef = new SidebarContainerRef();
    const sidebarRef = new SidebarRef<T>(currentConfig, sidebarContainerRef);

    if (this.containerRef) {
      this.destroySidebar();
    }

    this.sidebarContainerRef = sidebarContainerRef;

    this.attach(sidebarRef);

    return sidebarRef;
  }

  private attach(sidebarRef: SidebarRef): void {
    const scrollStrategy = this.overlay.scrollStrategies.block();

    this.overlayRef = this.overlay.create({ scrollStrategy });
    this.containerRef = this.overlayRef.attach(
      new ComponentPortal(SidebarContainerComponent, undefined, this.createInjector(sidebarRef, sidebarRef.data))
    );

    this.initSidebarListeners(sidebarRef);

    this.sidebarContainerRef?.onStartClosing(() => this.close());
    this.sidebarContainerRef?.onFinishClosing(() => this.destroySidebar());
  }

  private close(): void {
    if (this.containerRef?.instance) {
      this.containerRef.instance.startLeaveAnimation();
    }
  }

  private destroySidebar(): void {
    this.detach();

    this.sidebarContainerRef?.destroy();
    this.sidebarDestroy$.next();
    this.sidebarContainerRef = null;
  }

  private detach(): void {
    if (this.containerRef) {
      this.containerRef.destroy();
      this.containerRef = null;
      this.overlayRef?.detach();
    }
  }

  private initSidebarListeners(sidebarRef: SidebarRef): void {
    if (sidebarRef.hasBackdrop) {
      if (this.containerRef) {
        this.sidebarContainerRef?.initBackdrop(this.containerRef.instance.backdropClick$);
      }

      if (sidebarRef.closeOnBackdropClick) {
        this.containerRef?.instance.backdropClick$
          .pipe(take(1), takeUntil(this.sidebarDestroy$), untilDestroyed(this))
          .subscribe(() => {
            this.sidebarContainerRef?.close();
          });
      }
    }

    if (sidebarRef.closeOnNavigation) {
      this.router.events
        .pipe(
          filter(e => e instanceof NavigationStart),
          take(1),
          takeUntil(this.sidebarDestroy$),
          untilDestroyed(this)
        )
        .subscribe(() => {
          this.sidebarContainerRef?.close();
        });
    }
  }

  private createInjector(sidebarRef: SidebarRef, data: any): Injector {
    return Injector.create({
      providers: [
        {
          provide: SidebarRef,
          useValue: sidebarRef
        },
        {
          provide: SidebarContainerRef,
          useValue: this.sidebarContainerRef
        },
        {
          provide: SIDEBAR_DATA,
          useValue: data
        }
      ],
      parent: this.injector
    });
  }
}
