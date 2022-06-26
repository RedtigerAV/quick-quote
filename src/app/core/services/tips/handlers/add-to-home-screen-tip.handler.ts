import { Injectable } from '@angular/core';
import { BasicToastInfo } from '@shared/components/basic-toast/basic-toast';
import { AddToHomeScreenComponent } from '../templates/add-to-home-screen/add-to-home-screen.component';
import { TipsEventsEnum } from '../tips-events.enum';
import { TipHandler } from './tip.handler';

const QUOTES_TO_WATCH = 3;

@Injectable()
export class AddToHomeScreenTipHandler extends TipHandler {
  public name = 'add-to-homescreen';

  private addToHomeScreenRequested = false;
  private quotesWatched = 1;

  public canHandle(event: TipsEventsEnum): boolean {
    this.addToHomeScreenRequested = this.addToHomeScreenRequested || event === TipsEventsEnum.ADD_TO_HOME_SCREEN;
    this.quotesWatched += +(event === TipsEventsEnum.NEXT_QUOTE_SHOWED);

    return this.addToHomeScreenRequested && this.quotesWatched === QUOTES_TO_WATCH;
  }

  public handle(): void {
    this.toaster.open(
      new BasicToastInfo({ title: 'Add this app to home screen', content: AddToHomeScreenComponent }, false)
    );
  }
}
