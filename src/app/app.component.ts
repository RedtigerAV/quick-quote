import { Component, OnInit } from '@angular/core';
import { AnimationProcessService } from '@core/services/animations/animation-process.service';
import { ViewportService } from '@core/services/viewport/viewport.service';
import { ToastPositionEnum } from '@shared/services/toaster/toaster.interface';
import { ToasterService } from '@shared/services/toaster/toaster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly animationProcess: AnimationProcessService,
    private readonly toaster: ToasterService,
    private readonly viewport: ViewportService
  ) {}

  public ngOnInit(): void {
    this.animationProcess.init();
    this.viewport.isMobileViewport$.subscribe(isMobile =>
      this.toaster.updateDefaultConfig({
        position: isMobile ? ToastPositionEnum.TOP_CENTER : ToastPositionEnum.BOTTOM_LEFT
      })
    );
  }
}
