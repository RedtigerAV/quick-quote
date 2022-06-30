import { Injectable } from '@angular/core';
import { BasicToastInfo } from '@shared/components/basic-toast/basic-toast';
import { FirstVisitTipComponent } from '../templates/first-visit-tip/first-visit-tip.component';
import { TipsEventsEnum } from '../tips-events.enum';
import { TipHandler } from './tip.handler';

/**
 * The tip displayed when you first visit the app
 */
@Injectable()
export class FirstVisitTipHandler extends TipHandler {
  public name = 'first-visit';

  private isAppLoaded = false;
  private isQuotePageVisited = false;

  public canHandle(event: TipsEventsEnum): boolean {
    this.isAppLoaded = this.isAppLoaded || event === TipsEventsEnum.APP_LOAD;
    this.isQuotePageVisited = this.isQuotePageVisited || event === TipsEventsEnum.QUOTE_PAGE_VISIT;

    return this.isAppLoaded && this.isQuotePageVisited;
  }

  public handle(): void {
    setTimeout(
      () =>
        this.toaster.open(
          new BasicToastInfo({ title: 'Welcome to Quick Quote!', content: FirstVisitTipComponent }, false)
        ),
      500
    );
  }
}
