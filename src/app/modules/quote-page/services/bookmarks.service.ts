import { Injectable } from '@angular/core';
import { BookmarksFacade } from '@core/redux/bookmarks/bookmarks.facade';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SidebarService } from '@shared/services/sidebar/sidebar.service';
import { combineLatest, filter, map, Observable, take } from 'rxjs';
import { BookmarksComponent } from '../components/bookmarks/bookmarks.component';
import { NextQuoteService } from './next-quote.service';

@UntilDestroy()
@Injectable()
export class BookmarksService {
  public readonly isSelectedQuoteBookmark$: Observable<boolean>;

  constructor(
    bookmarksFacade: BookmarksFacade,
    private readonly sidebarService: SidebarService,
    private readonly quotesFacade: QuotesFacade,
    private readonly nextQuoteService: NextQuoteService
  ) {
    this.isSelectedQuoteBookmark$ = combineLatest([quotesFacade.selectedQuoteID$, bookmarksFacade.bookmarksIDs$]).pipe(
      map(([selectedQuoteID, bookmarksIDs]) => (selectedQuoteID ? bookmarksIDs.includes(selectedQuoteID) : false))
    );
  }

  public openBookmarks(): void {
    this.sidebarService
      .open({ content: BookmarksComponent })
      .afterClosed()
      .pipe(take(1), filter(Boolean), untilDestroyed(this))
      .subscribe(result => {
        const isEqual = result.id === this.quotesFacade.selectedQuoteID;
        const isNextEqual = result.id === this.quotesFacade.nextQuote?.id;

        if (isNextEqual) {
          this.nextQuoteService.goToNextQuote().subscribe();
        } else if (!isEqual) {
          this.quotesFacade.addQuote(result, this.quotesFacade.currentPosition + 1);

          setTimeout(() => this.nextQuoteService.goToNextQuote().subscribe(), 0);
        }
      });
  }
}
