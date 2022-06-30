import { Injectable } from '@angular/core';
import { PhotoTopicsFacade } from '@core/redux/photo-topics/photo-topics.facade';
import { QuoteTopicsFacade } from '@core/redux/quote-topics/quote-topics.facade';
import { HtmlToImageService } from '@core/services/html-to-image/html-to-image.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SidebarService } from '@shared/services/sidebar/sidebar.service';
import { filter, take } from 'rxjs';
import { SettingsComponent } from '../components/settings/settings.component';
import { ISettingsData } from '../components/settings/settings.interfaces';
import { QuotesMediator, QuotesMediatorEvents } from './quotes.mediator';
import { SlideshowService } from './slideshow.service';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { PhotosFacade } from '@core/redux/photos/photos.facade';
import intersection from 'lodash-es/intersection';
import { ToasterService } from '@shared/services/toaster/toaster.service';
import { BasicToastSuccess } from '@shared/components/basic-toast/basic-toast';

/**
 * Service to open settings sidebar, transfer data to it and parse the result
 */
@UntilDestroy()
@Injectable()
export class SettingsService {
  constructor(
    private readonly sidebar: SidebarService,
    private readonly slideshowService: SlideshowService,
    private readonly htmlToImageService: HtmlToImageService,
    private readonly quoteTopicsFacade: QuoteTopicsFacade,
    private readonly photoTopicsFacade: PhotoTopicsFacade,
    private readonly quotesFacade: QuotesFacade,
    private readonly photosFacade: PhotosFacade,
    private readonly toaster: ToasterService
  ) {}

  public openSettings(): void {
    QuotesMediator.notify(QuotesMediatorEvents.SIDEBAR_OPENED);

    const slideshowTime = this.slideshowService.time;
    const snapshotExtension = this.htmlToImageService.getStrategy().extension;
    const selectedQuoteTopicsIDs = this.quoteTopicsFacade.selectedTopicsIDs;
    const selectedPhotoTopicsIDs = this.photoTopicsFacade.selectedTopicsIDs;

    const sidebarRef = this.sidebar.open<SettingsComponent, ISettingsData>({
      content: SettingsComponent,
      data: {
        slideshowTime,
        snapshotExtension,
        selectedQuoteTopicsIDs,
        selectedPhotoTopicsIDs
      }
    });

    sidebarRef
      .beforeClosed()
      .pipe(take(1), filter(Boolean), untilDestroyed(this))
      .subscribe((result: ISettingsData) => {
        if (slideshowTime !== result.slideshowTime) {
          this.slideshowService.updateTime(result.slideshowTime);
        }

        if (snapshotExtension !== result.snapshotExtension) {
          this.htmlToImageService.setStrategy(result.snapshotExtension);
        }

        this.handleQuoteTopicsChange(selectedQuoteTopicsIDs, result.selectedQuoteTopicsIDs);
        this.handlePhotoTopicsChange(selectedPhotoTopicsIDs, result.selectedPhotoTopicsIDs);
      });

    sidebarRef
      .beforeClosed()
      .pipe(take(1), untilDestroyed(this))
      .subscribe(() => QuotesMediator.notify(QuotesMediatorEvents.SIDEBAR_CLOSED));

    sidebarRef
      .afterClosed()
      .pipe(take(1), filter(Boolean), untilDestroyed(this))
      .subscribe(() =>
        this.toaster.open(
          new BasicToastSuccess({
            title: 'Well done!',
            content: 'Settings saved successfully'
          })
        )
      );
  }

  private handleQuoteTopicsChange(previous: string[], next: string[]): void {
    this.quoteTopicsFacade.selectTopics(next);

    const intersectionLength = intersection(previous, next).length;

    if (intersectionLength === 0 || intersectionLength !== previous.length) {
      const currentPosition = this.quotesFacade.currentPosition;
      const total = this.quotesFacade.quotesTotal;

      this.quotesFacade.removeQuotes(currentPosition + 1, total);
      this.quotesFacade.loadQuote();
    }
  }

  private handlePhotoTopicsChange(previous: string[], next: string[]): void {
    this.photoTopicsFacade.selectTopics(next);

    const intersectionLength = intersection(previous, next).length;

    if (previous.length !== next.length || intersectionLength !== previous.length) {
      const currentPosition = this.photosFacade.selectedPhotoPosition;
      const total = this.photosFacade.photos.length;

      this.photosFacade.removePhotos(currentPosition + 1, total);
      this.photosFacade.loadPhotos();
    }
  }
}
