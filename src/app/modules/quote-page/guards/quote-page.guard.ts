import { AppRoutePath } from '../../../app.route-path';
import { map, merge, Observable, of, take, tap } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';

/**
 * Guard to load first quote. If quote param is specified, load quote by id
 */
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
      this.quotesFacade.loadQuoteSuccessAction$.pipe(map(() => true)),
      this.quotesFacade.loadQuoteFailureAction$.pipe(map(() => this.router.createUrlTree(['/', AppRoutePath.OOPS])))
    ).pipe(take(1));
  }
}
