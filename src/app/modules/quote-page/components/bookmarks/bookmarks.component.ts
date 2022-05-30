import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { IQuote } from '@core/models/quote.model';
import { FavouritesFacade } from '@core/redux/favourites/favourites.facade';
import { SidebarRef } from '@shared/services/sidebar/sidebar.reference';
import { SIDEBAR_DATA } from '@shared/services/sidebar/sidebar.token';
import { Observable } from 'rxjs';
import { QuoteHelper } from '../../helpers/quote.helper';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksComponent implements OnInit {
  public readonly favourites$: Observable<Array<IQuote>>;

  constructor(public readonly sidebarRef: SidebarRef, favouritesFacade: FavouritesFacade) {
    this.favourites$ = favouritesFacade.favourites$;
  }

  ngOnInit(): void {}

  public getAuthorInfo(quote: IQuote): string {
    return QuoteHelper.getAuthoInfo(quote);
  }
}
