import { MediaMatcher } from '@angular/cdk/layout';
import { Inject, Injectable, NgZone } from '@angular/core';
import { MediaQueryListModel } from './media-query-list.model';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { zoneAware } from '@core/rxjs-operators/zone-aware';
import { getObservableSnapshot } from '@core/rxjs-operators/helpers/get-observable-snapshot.helper';

import { IViewportConfig, VIEWPORT_CONFIG_INJECTION_TOKEN, ViewportSize } from './viewport.config';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  public isMobileViewport$!: Observable<boolean>;
  public isTabletViewport$!: Observable<boolean>;
  public isDesktopViewport$!: Observable<boolean>;
  public viewportSize$!: Observable<ViewportSize>;

  private _mobile!: MediaQueryListModel;
  private _tablet!: MediaQueryListModel;
  private _desktop!: MediaQueryListModel;
  private mediaQueryListModels!: MediaQueryListModel[];

  constructor(
    public mediaMatcher: MediaMatcher,
    @Inject(VIEWPORT_CONFIG_INJECTION_TOKEN) private readonly config: IViewportConfig,
    private readonly ngZone: NgZone
  ) {
    this.initMediaQueryListModels(this.config);
    this.initObservers();
    this.initViewportSize();
  }

  public get viewportSize(): ViewportSize {
    return getObservableSnapshot(this.viewportSize$);
  }

  private initMediaQueryListModels(config: IViewportConfig): void {
    this._mobile = new MediaQueryListModel({
      name: ViewportSize.MOBILE,
      breakpoint: { from: 0, to: config.breakpoints.sm },
      mediaMatcher: this.mediaMatcher
    });

    this._tablet = new MediaQueryListModel({
      name: ViewportSize.TABLET,
      breakpoint: { from: config.breakpoints.sm, to: config.breakpoints.md },
      mediaMatcher: this.mediaMatcher
    });

    this._desktop = new MediaQueryListModel({
      name: ViewportSize.DESKTOP,
      breakpoint: { from: config.breakpoints.md },
      mediaMatcher: this.mediaMatcher
    });

    this.mediaQueryListModels = [this._mobile, this._tablet, this._desktop];
  }

  private initObservers(): void {
    this.isMobileViewport$ = this._mobile.observer$.pipe(zoneAware(this.ngZone));
    this.isTabletViewport$ = this._tablet.observer$.pipe(zoneAware(this.ngZone));
    this.isDesktopViewport$ = this._desktop.observer$.pipe(zoneAware(this.ngZone));
  }

  private initViewportSize(): void {
    this.viewportSize$ = combineLatest([this.isDesktopViewport$, this.isTabletViewport$, this.isMobileViewport$]).pipe(
      map(([isDesktop, isTablet]) => {
        if (isDesktop) {
          return ViewportSize.DESKTOP;
        }

        if (isTablet) {
          return ViewportSize.TABLET;
        }

        return ViewportSize.MOBILE;
      })
    );
  }
}
