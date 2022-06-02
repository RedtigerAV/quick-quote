import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { FavouritesFacade } from '@core/redux/favourites/favourites.facade';
import { RequestStatusEnum } from '@core/types/request-status.type';

@Injectable({ providedIn: 'root' })
export class FavoutitesGuard implements CanActivate {
  constructor(private readonly favouritesFacade: FavouritesFacade) {}

  public canActivate(): boolean {
    if (this.favouritesFacade.favouritesStatus === RequestStatusEnum.PENDING) {
      this.favouritesFacade.loadFavourites();
    }

    return true;
  }
}
