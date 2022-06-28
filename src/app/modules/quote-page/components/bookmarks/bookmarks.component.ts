import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IQuote } from '@core/models/quote.model';
import { BookmarksFacade } from '@core/redux/bookmarks/bookmarks.facade';
import { RequestStatusEnum, RequestStatusType } from '@core/types/request-status.type';
import { SidebarRef } from '@shared/services/sidebar/sidebar.reference';
import { Observable } from 'rxjs';
import { AppRoutePath } from 'src/app/app.route-path';
import { QuoteHelper } from '../../helpers/quote.helper';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // prettier-ignore
    trigger('fadeOut', [
      transition(':leave', [
        style({opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)'}),
        animate('.5s cubic-bezier(.75,0,.75,0)', style({ opacity: 0, transform: 'translate3d(100%, 0, 0) scale(.6)' })),
      ])
    ])
  ]
})
export class BookmarksComponent implements OnInit {
  public readonly bookmarks$: Observable<Array<IQuote>>;
  public readonly status$: Observable<RequestStatusType>;
  public readonly statusEnum = RequestStatusEnum;
  public readonly routePath = AppRoutePath;

  constructor(public readonly sidebarRef: SidebarRef, private readonly bookmarksFacade: BookmarksFacade) {
    this.bookmarks$ = bookmarksFacade.bookmarks$;
    this.status$ = bookmarksFacade.bookmarksStatus$;
  }

  ngOnInit(): void {}

  public getAuthorInfo(quote: IQuote): string {
    return QuoteHelper.getAuthoInfo(quote);
  }

  public selectQuote(bookmark: IQuote): void {
    this.sidebarRef.close(bookmark);
  }

  public remove(id: string): void {
    this.bookmarksFacade.removeBookmark(id);
  }

  public loadBookmarks(): void {
    this.bookmarksFacade.loadBookmarks();
  }
}
