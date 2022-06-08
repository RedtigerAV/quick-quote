import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { BookmarksFacade } from '@core/redux/bookmarks/bookmarks.facade';
import { RequestStatusEnum } from '@core/types/request-status.type';

@Injectable({ providedIn: 'root' })
export class BookmarksGuard implements CanActivate {
  constructor(private readonly bookmarksFacade: BookmarksFacade) {}

  public canActivate(): boolean {
    if (this.bookmarksFacade.bookmarksStatus === RequestStatusEnum.PENDING) {
      this.bookmarksFacade.loadBookmarks();
    }

    return true;
  }
}
