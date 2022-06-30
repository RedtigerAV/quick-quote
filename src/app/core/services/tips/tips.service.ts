import { Inject, Injectable } from '@angular/core';
import { TipHandler } from './handlers/tip.handler';
import { TIPS_HANDLER } from './handlers/tips-handler.token';
import { TipsEventsEnum } from './tips-events.enum';
import { TipsStorage } from './tips.storage';

/**
 * A general service for managing the tips that appear to the user.
 * It works as a mediator service that listens to application events
 * and redirects them to handlers who decide whether to show a tips or not.
 *
 * The service can also be used to inform about new releases of the application
 */
@Injectable()
export class TipsService {
  constructor(
    @Inject(TIPS_HANDLER) private readonly handlers: Array<TipHandler>,
    private readonly tipsStorage: TipsStorage
  ) {}

  public notify(event: TipsEventsEnum): void {
    this.handlers.forEach(handler => {
      if (!this.tipsStorage.isTipHandled(handler.name) && handler.canHandle(event)) {
        this.tipsStorage.markTipAsHandled(handler.name);
        handler.handle();
      }
    });
  }
}
