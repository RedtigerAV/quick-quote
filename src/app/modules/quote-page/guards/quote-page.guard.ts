import { AppRoutePath } from '../../../app.route-path';
import { map, merge, Observable, of, take, tap } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';

@Injectable({ providedIn: 'root' })
export class QuotePageGuard implements CanActivate {
  constructor(private readonly quotesFacade: QuotesFacade, private readonly router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const id = route.queryParamMap.get('quote') || undefined;
    const selectedQuoteID = this.quotesFacade.selectedQuoteID;

    if (selectedQuoteID) {
      return of(true);
    }

    this.quotesFacade.loadQuote(id);

    return merge(
      this.quotesFacade.loadQuoteSuccessAction$.pipe(
        tap(({ quote }) => {
          this.quotesFacade.selectQuote(quote.id);

          // Load next random quote
          this.quotesFacade.loadQuote();
        }),
        map(() => true)
      ),
      this.quotesFacade.loadQuoteFailureAction$.pipe(map(() => this.router.createUrlTree(['/', AppRoutePath.OOPS])))
    ).pipe(take(1));
  }
}