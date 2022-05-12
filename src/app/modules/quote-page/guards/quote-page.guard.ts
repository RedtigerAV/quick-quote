import { AppRoutePath } from './../../../app.route-path';
import { IQuote } from '@core/models/quote.model';
import { QuoteService } from '@core/services/quote.service';
import { RequestStatusEnum } from '@core/types/request-status.type';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { Observable, filter, take, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { getObservableSnapshot } from '@core/rxjs-operators/helpers/get-observable-snapshot.helper';

@Injectable({ providedIn: 'root' })
export class QuotePageGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly quotesFacade: QuotesFacade,
    private readonly quoteService: QuoteService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.loadNextQuote();

    const id = route.queryParamMap.get('quote') || undefined;

    return this.quotesFacade.currentQuoteState$.pipe(
      tap(({ status }) => {
        if (status === RequestStatusEnum.PENDING) {
          this.quotesFacade.loadCurrentQuote(id);
        }
      }),
      filter(({ status }) => status !== RequestStatusEnum.PENDING && status !== RequestStatusEnum.LOADING),
      take(1),
      map(state => {
        if (state.status === RequestStatusEnum.SUCCESS) {
          const shouldSkipQueryChange = id === state.quote?.id;

          this.quoteService.setQuote(state.quote as IQuote, shouldSkipQueryChange);

          return true;
        } else if (state.status === RequestStatusEnum.ERROR && !!id) {
          // Retrieve random quote and navigate to /
          this.quotesFacade.loadCurrentQuote();

          this.router.navigate(['.'], { queryParams: {}, replaceUrl: true });

          return false;
        }

        this.router.navigate([AppRoutePath.OOPS]);

        return false;
      })
    );
  }

  private loadNextQuote(): void {
    const { status } = getObservableSnapshot(this.quotesFacade.nextQuoteState$);
    const shouldLoadImage = status === RequestStatusEnum.PENDING || status === RequestStatusEnum.ERROR;

    if (shouldLoadImage) {
      this.quotesFacade.loadNextQuote();
    }
  }
}
