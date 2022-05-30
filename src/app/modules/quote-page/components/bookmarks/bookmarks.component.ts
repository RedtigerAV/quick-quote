import { animate, group, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IQuote } from '@core/models/quote.model';
import { FavouritesFacade } from '@core/redux/favourites/favourites.facade';
import { SidebarRef } from '@shared/services/sidebar/sidebar.reference';
import { Observable } from 'rxjs';
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
  public readonly favourites$: Observable<Array<IQuote>>;

  constructor(public readonly sidebarRef: SidebarRef, private readonly favouritesFacade: FavouritesFacade) {
    this.favourites$ = favouritesFacade.favourites$;
  }

  ngOnInit(): void {}

  public getAuthorInfo(quote: IQuote): string {
    return QuoteHelper.getAuthoInfo(quote);
  }

  public selectQuote(favourite: IQuote): void {
    this.sidebarRef.close(favourite);
  }

  public remove(id: string): void {
    this.favouritesFacade.removeFavourite(id);
  }
}
