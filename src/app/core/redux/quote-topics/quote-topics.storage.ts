import { Injectable } from '@angular/core';
import { WebStorageService } from '@core/services/webstorage/webstorage.service';

/**
 * Service for working with quote topic's localStorage
 */
@Injectable({ providedIn: 'root' })
export class QuoteTopicsStorage {
  private readonly lsKey = 'quote-topics';

  constructor(private readonly webStorageService: WebStorageService) {}

  public get selectedTopicsIDs(): Array<string> {
    const rawString: string = this.webStorageService.local.getItem(this.lsKey);
    const rawIDs = !!rawString ? rawString.split(',') : [];

    return this.prepareIDs(rawIDs);
  }

  public set selectedTopicsIDs(ids: Array<string>) {
    const newIDs = ids.toString();

    this.webStorageService.local.setItem(this.lsKey, newIDs);
  }

  private prepareIDs(rawIDs: Array<string>): Array<string> {
    return rawIDs.filter(id => this.verifyID(id));
  }

  private verifyID(id: string): boolean {
    return !Number.isNaN(Number(id));
  }
}
