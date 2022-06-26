import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AddToHomeScreenPlatformEnum, PWAService } from '@core/services/pwa.service';
import { ToastRef } from '@shared/services/toaster/toaster.reference';

@Component({
  selector: 'app-add-to-home-screen',
  templateUrl: './add-to-home-screen.component.html',
  styleUrls: ['./add-to-home-screen.component.scss']
})
export class AddToHomeScreenComponent implements OnInit {
  public refusedToInstall = false;
  public addToHomeScreenPlatformEnum = AddToHomeScreenPlatformEnum;

  constructor(public readonly toastRef: ToastRef, public readonly pwaService: PWAService) {}

  ngOnInit(): void {}

  public install(): void {
    this.pwaService.callAddToHomeScreen();
    this.toastRef.close();
  }

  public refuse(): void {
    this.refusedToInstall = true;
  }
}
