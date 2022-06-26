import { Inject, Injectable } from '@angular/core';
import { WebStorageService } from '../webstorage/webstorage.service';
import { TipHandler } from './handlers/tip.handler';
import { TIPS_HANDLER } from './handlers/tips-handler.token';
import { TipsEventsEnum } from './tips-events.enum';
import { TipsStorage } from './tips.storage';

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
