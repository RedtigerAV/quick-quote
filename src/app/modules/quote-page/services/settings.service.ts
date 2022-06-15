import { Injectable } from '@angular/core';
import { HtmlToImageService } from '@core/services/html-to-image/html-to-image.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SidebarService } from '@shared/services/sidebar/sidebar.service';
import { take } from 'rxjs';
import { SettingsComponent } from '../components/settings/settings.component';
import { ISettingsData } from '../components/settings/settings.interfaces';
import { QuotesMediator, QuotesMediatorEvents } from './quotes.mediator';
import { SlideshowService } from './slideshow.service';

@UntilDestroy()
@Injectable()
export class SettingsService {
  constructor(
    private readonly sidebar: SidebarService,
    private readonly slideshowService: SlideshowService,
    private readonly htmlToImageService: HtmlToImageService
  ) {}

  public openSettings(): void {
    QuotesMediator.notify(QuotesMediatorEvents.SIDEBAR_OPENED);

    const sidebarRef = this.sidebar.open<SettingsComponent, ISettingsData>({
      content: SettingsComponent,
      data: {
        slideshowTime: this.slideshowService.time,
        snapshotExtension: this.htmlToImageService.getStrategy().extension
      }
    });

    sidebarRef
      .afterClosed()
      .pipe(take(1), untilDestroyed(this))
      .subscribe(result => {
        console.log(result);
      });

    sidebarRef
      .beforeClosed()
      .pipe(take(1), untilDestroyed(this))
      .subscribe(() => QuotesMediator.notify(QuotesMediatorEvents.SIDEBAR_CLOSED));
  }
}
