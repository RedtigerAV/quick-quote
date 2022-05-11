import { selectCurrentBackgroundImageState, selectNextBackgroundImageState } from './background-images.selectors';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IState } from '../index.state';
import * as actions from './background-images.actions';
import { IBackgroundImageState } from './background-images.state';

@Injectable({ providedIn: 'root' })
export class BackgroundImagesFacade {
  public readonly currentBackgroundImageState$: Observable<IBackgroundImageState>;
  public readonly nextBackgroundImageState$: Observable<IBackgroundImageState>;

  constructor(private readonly store: Store<IState>) {
    this.currentBackgroundImageState$ = store.pipe(select(selectCurrentBackgroundImageState));
    this.nextBackgroundImageState$ = store.pipe(select(selectNextBackgroundImageState));
  }

  public loadImages(): void {
    this.loadCurrentImage();
    this.loadNextImage();
  }

  public loadCurrentImage(): void {
    this.store.dispatch(actions.loadCurrentBackgroundImage());
  }

  public loadNextImage(): void {
    this.store.dispatch(actions.loadNextBackgroundImage());
  }

  public goToNextImage(): void {
    this.store.dispatch(actions.goToNextBackgroundImage());
  }
}
