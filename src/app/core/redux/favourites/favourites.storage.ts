import { Injectable } from '@angular/core';
import { WebStorageService } from '@core/services/webstorage/webstorage.service';

@Injectable({ providedIn: 'root' })
export class FavouritesStorage {
  private key = 'favourites';

  constructor(private readonly webStorageService: WebStorageService) {}

  public get favouriteIDs(): Array<string> {
    const rawString: string = this.webStorageService.local.getItem(this.key);
    const rawIDs = !!rawString ? rawString.split(',') : [];

    return this.prepareIDs(rawIDs);
  }

  public addID(id: string): void {
    if (this.favouriteIDs.includes(id)) {
      return;
    }

    const newIDs = [id, ...this.favouriteIDs].toString();

    this.webStorageService.local.setItem(this.key, newIDs);
  }

  public removeID(id: string): void {
    const newIDs = this.favouriteIDs.filter(_id => _id !== id).toString();

    this.webStorageService.local.setItem(this.key, newIDs);
  }

  private prepareIDs(rawIDs: Array<string>): Array<string> {
    return rawIDs.filter(id => this.verifyID(id));
  }

  private verifyID(id: string): boolean {
    return !Number.isNaN(Number(id));
  }
}
