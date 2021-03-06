import { Injectable, OnDestroy } from '@angular/core';
import { TipsEventsEnum } from '@core/services/tips/tips-events.enum';
import { TipsService } from '@core/services/tips/tips.service';
import { Nullable } from '@core/types/nullable.type';
import { QuotePageComponent } from '../quote-page.component';
import { NextQuoteService } from './next-quote.service';
import { PreviousQuoteService } from './previous-quote.service';
import { SlideshowService, SlidwshowStateEnum } from './slideshow.service';

export enum QuotesMediatorEvents {
  TO_NEXT_QUOTE,
  TO_NEXT_QUOTE_FINISH,
  TO_NEXT_QUOTE_ERROR,
  TO_PREVIOUS_QUOTE,
  TO_PREVIOUS_QUOTE_FINISH,
  SIDEBAR_OPENED,
  SIDEBAR_CLOSED
}

/**
 * A mediator service that processes application events related to quotes and determines the sequence of actions how to respond to events.
 * The implementation of handlers is determined by injected services
 */
@Injectable()
export class QuotesMediator implements OnDestroy {
  private static _instance: Nullable<QuotesMediator>;

  public hostComponent!: QuotePageComponent;

  constructor(
    private readonly nextQuoteService: NextQuoteService,
    private readonly previousQuoteService: PreviousQuoteService,
    private readonly slideshowService: SlideshowService,
    private readonly tipsService: TipsService
  ) {
    QuotesMediator._instance = this;
  }

  public static notify(event: QuotesMediatorEvents): void {
    if (!QuotesMediator._instance) {
      throw new Error('QuotesMediator instance has not created');
    }

    switch (event) {
      case QuotesMediatorEvents.TO_NEXT_QUOTE:
        return QuotesMediator._instance.onToNextQuote();
      case QuotesMediatorEvents.TO_NEXT_QUOTE_FINISH:
        return QuotesMediator._instance.onToNextQuoteFinish();
      case QuotesMediatorEvents.TO_NEXT_QUOTE_ERROR:
        return QuotesMediator._instance.onToNextQuoteError();
      case QuotesMediatorEvents.TO_PREVIOUS_QUOTE:
        return QuotesMediator._instance.onToPreviousQuote();
      case QuotesMediatorEvents.TO_PREVIOUS_QUOTE_FINISH:
        return QuotesMediator._instance.onToPreviousQuoteFinish();
      case QuotesMediatorEvents.SIDEBAR_OPENED:
        return QuotesMediator._instance.onSidebarOpened();
      case QuotesMediatorEvents.SIDEBAR_CLOSED:
        return QuotesMediator._instance.onSidebarClosed();
    }
  }

  public ngOnDestroy(): void {
    QuotesMediator._instance = null;
  }

  private onToNextQuote(): void {
    this.nextQuoteService.toNextQuote();
    this.hostComponent.setNextButtonDisabledState(true);

    if (this.slideshowService.state === SlidwshowStateEnum.STARTED) {
      this.slideshowService.resetTimer();
    }
  }

  private onToNextQuoteFinish(): void {
    this.tipsService.notify(TipsEventsEnum.NEXT_QUOTE_SHOWED);
    this.hostComponent.setNextButtonDisabledState(false);

    if (this.slideshowService.state === SlidwshowStateEnum.STARTED) {
      this.slideshowService.playTimer();
    }
  }

  private onToNextQuoteError(): void {
    this.hostComponent.setNextButtonDisabledState(false);
    this.hostComponent.showError('Quote loading error');

    if (this.slideshowService.state === SlidwshowStateEnum.STARTED) {
      this.slideshowService.stop();
    }
  }

  private onToPreviousQuote(): void {
    if (!this.previousQuoteService.hasPreviousQuote) {
      return;
    }

    this.previousQuoteService.toPreviousQuote();
    this.hostComponent.setPreviousButtonDisabledState(true);

    if (this.slideshowService.state === SlidwshowStateEnum.STARTED) {
      this.slideshowService.resetTimer();
    }
  }

  private onToPreviousQuoteFinish(): void {
    this.hostComponent.setPreviousButtonDisabledState(false);
    if (this.slideshowService.state === SlidwshowStateEnum.STARTED) {
      this.slideshowService.playTimer();
    }
  }

  private onSidebarOpened(): void {
    if (this.slideshowService.state === SlidwshowStateEnum.STARTED) {
      this.slideshowService.pauseTimer();
    }
  }

  private onSidebarClosed(): void {
    if (this.slideshowService.state === SlidwshowStateEnum.STARTED) {
      this.slideshowService.playTimer();
    }
  }
}
