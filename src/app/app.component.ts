import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AnimationProcessService } from '@core/services/animations/animation-process.service';
import { RootLoaderService } from '@core/services/animations/root-loader.service';
import { TipsEventsEnum } from '@core/services/tips/tips-events.enum';
import { TipsService } from '@core/services/tips/tips.service';
import { ViewportService } from '@core/services/viewport/viewport.service';
import { ToastPositionEnum } from '@shared/services/toaster/toaster.interface';
import { ToasterService } from '@shared/services/toaster/toaster.service';
import { AnimationEvent } from '@angular/animations';

enum RootRouterAnimationStateEnum {
  ACTIVATED = 'activated',
  PENDING = 'pending'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      state(RootRouterAnimationStateEnum.ACTIVATED, style({ opacity: 1 })),
      state(RootRouterAnimationStateEnum.PENDING, style({ opacity: 0 })),
      transition(
        `${RootRouterAnimationStateEnum.PENDING} => ${RootRouterAnimationStateEnum.ACTIVATED}`,
        animate('0.7s ease-in-out')
      )
    ])
  ]
})
export class AppComponent implements OnInit {
  public routerAnimationState = RootRouterAnimationStateEnum.PENDING;

  constructor(
    private readonly animationProcess: AnimationProcessService,
    private readonly toaster: ToasterService,
    private readonly viewport: ViewportService,
    private readonly rootLoaderService: RootLoaderService,
    private readonly tipsService: TipsService
  ) {}

  public ngOnInit(): void {
    this.animationProcess.init();
    this.viewport.isMobileViewport$.subscribe(isMobile =>
      this.toaster.updateDefaultConfig({
        position: isMobile ? ToastPositionEnum.TOP_CENTER : ToastPositionEnum.BOTTOM_LEFT
      })
    );
  }

  public routeActivated(): void {
    this.routerAnimationState = RootRouterAnimationStateEnum.ACTIVATED;
    this.rootLoaderService.turnOffLoader();
  }

  public onAnimationDone(event: AnimationEvent): void {
    if (event.toState === RootRouterAnimationStateEnum.ACTIVATED) {
      this.tipsService.notify(TipsEventsEnum.APP_LOAD);
    }
  }
}
