import { ActivatedRoute, Router } from '@angular/router';
import { Nullable } from '@core/types/nullable.type';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { IQuote } from '@core/models/quote.model';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  public readonly quote$: Observable<Nullable<IQuote>>;
  private readonly _quote$: BehaviorSubject<Nullable<IQuote>>;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {
    this._quote$ = new BehaviorSubject<Nullable<IQuote>>(null);
    this.quote$ = this._quote$.asObservable();
  }

  public setQuote(quote: IQuote, skipQueryChange = false): void {
    this._quote$.next(quote);

    if (!skipQueryChange) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { quote: quote.id },
        replaceUrl: true,
        queryParamsHandling: 'merge'
      });
    }
  }
}
