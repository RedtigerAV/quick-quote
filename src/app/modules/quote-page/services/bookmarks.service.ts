import { Injectable } from '@angular/core';
import { BookmarksFacade } from '@core/redux/bookmarks/bookmarks.facade';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SidebarService } from '@shared/services/sidebar/sidebar.service';
import { combineLatest, filter, map, Observable, take } from 'rxjs';
import { BookmarksComponent } from '../components/bookmarks/bookmarks.component';
import { QuotesMediator, QuotesMediatorEvents } from './quotes.mediator';

/**
 * Service to open bookmarks sidebar and parse the result
 */
@UntilDestroy()
@Injectable()
export class BookmarksService {
  public readonly isSelectedQuoteBookmark$: Observable<boolean>;

  constructor(
    bookmarksFacade: BookmarksFacade,
    private readonly sidebarService: SidebarService,
    private readonly quotesFacade: QuotesFacade
  ) {
    this.isSelectedQuoteBookmark$ = combineLatest([quotesFacade.selectedQuoteID$, bookmarksFacade.bookmarksIDs$]).pipe(
      map(([selectedQuoteID, bookmarksIDs]) => (selectedQuoteID ? bookmarksIDs.includes(selectedQuoteID) : false))
    );
  }

  public openBookmarks(): void {
    QuotesMediator.notify(QuotesMediatorEvents.SIDEBAR_OPENED);

    const sidebarRef = this.sidebarService.open({ content: BookmarksComponent });

    sidebarRef
      .beforeClosed()
      .pipe(take(1), filter(Boolean), untilDestroyed(this))
      .subscribe(result => {
        const isEqual = result.id === this.quotesFacade.selectedQuoteID;
        const isNextEqual = result.id === this.quotesFacade.nextQuote?.id;

        if (isNextEqual) {
          QuotesMediator.notify(QuotesMediatorEvents.TO_NEXT_QUOTE);
        } else if (!isEqual) {
          this.quotesFacade.addQuote(result, this.quotesFacade.currentPosition + 1);

          QuotesMediator.notify(QuotesMediatorEvents.TO_NEXT_QUOTE);
        }
      });

    sidebarRef
      .beforeClosed()
      .pipe(take(1), untilDestroyed(this))
      .subscribe(() => QuotesMediator.notify(QuotesMediatorEvents.SIDEBAR_CLOSED));
  }
}
