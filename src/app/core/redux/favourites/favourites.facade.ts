import { getObservableSnapshot } from '@core/rxjs-operators/helpers/get-observable-snapshot.helper';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IState } from '../index.state';
import { IQuote } from '@core/models/quote.model';
import { RequestStatusType } from '@core/types/request-status.type';
import * as favouritesSelectors from './favourites.selectors';
import * as favouritesActions from './favourites.actions';

@Injectable({ providedIn: 'root' })
export class FavouritesFacade {
  public readonly favourites$: Observable<Array<IQuote>>;
  public readonly favouritesIDs$: Observable<Array<string>>;
  public readonly favouritesStatus$: Observable<RequestStatusType>;

  constructor(private readonly store: Store<IState>) {
    this.favourites$ = store.pipe(select(favouritesSelectors.selectFavourites));
    this.favouritesIDs$ = store.pipe(select(favouritesSelectors.selectFavouritesIDs));
    this.favouritesStatus$ = store.pipe(select(favouritesSelectors.selectFavouritesStatus));
  }

  public get favourites(): Array<IQuote> {
    return getObservableSnapshot(this.favourites$) || [];
  }

  public get favouritesIDs(): Array<string> {
    return getObservableSnapshot(this.favouritesIDs$) || [];
  }

  public get favouritesStatus(): RequestStatusType {
    return getObservableSnapshot(this.favouritesStatus$);
  }

  public loadFavourites(): void {
    this.store.dispatch(favouritesActions.loadFavourites());
  }

  public addFavourite(quote: IQuote): void {
    if (!quote || this.favouritesIDs.includes(quote.id)) {
      return;
    }

    this.store.dispatch(favouritesActions.addFavourite({ quote }));
  }

  public removeFavourite(id: string): void {
    if (!this.favouritesIDs.includes(id)) {
      return;
    }

    this.store.dispatch(favouritesActions.removeFavourite({ id }));
  }
}
