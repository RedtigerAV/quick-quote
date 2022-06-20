import { Injectable } from '@angular/core';
import { WebStorageService } from '../webstorage/webstorage.service';

type TipsStorageType = {
  [key: string]: boolean;
};

@Injectable()
export class TipsStorage {
  private readonly tipsStorage: TipsStorageType;
  private readonly lsKey = 'tips';

  constructor(private readonly webstorage: WebStorageService) {
    this.tipsStorage = this.webstorage.local.getItem(this.lsKey) || {};
  }

  public isTipHandled(tipName: string): boolean {
    return this.tipsStorage[tipName];
  }

  public markTipAsHandled(tipName: string): void {
    this.tipsStorage[tipName] = true;

    this.webstorage.local.setItem(this.lsKey, this.tipsStorage);
  }
}
