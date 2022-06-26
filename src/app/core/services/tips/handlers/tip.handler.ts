import { Injectable } from '@angular/core';
import { ToasterService } from '@shared/services/toaster/toaster.service';
import { TipsEventsEnum } from '../tips-events.enum';

@Injectable()
export abstract class TipHandler {
  public abstract name: string;

  constructor(protected readonly toaster: ToasterService) {}

  public abstract canHandle(event: TipsEventsEnum): boolean;
  public abstract handle(): void;
}
