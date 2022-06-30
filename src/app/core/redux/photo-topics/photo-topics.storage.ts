import { Injectable } from '@angular/core';
import { WebStorageService } from '@core/services/webstorage/webstorage.service';

/**
 * Service for working with photo topic's localStorage
 */
@Injectable({ providedIn: 'root' })
export class PhotoTopicsStorage {
  private readonly lsKey = 'photo-topics';

  constructor(private readonly webStorageService: WebStorageService) {}

  public get selectedTopicsIDs(): Array<string> {
    const rawString: string = this.webStorageService.local.getItem(this.lsKey);

    return !!rawString ? rawString.split(',') : [];
  }

  public set selectedTopicsIDs(ids: Array<string>) {
    const newIDs = ids.toString();

    this.webStorageService.local.setItem(this.lsKey, newIDs);
  }
}
