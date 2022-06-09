import { Injectable, OnDestroy } from '@angular/core';
import { Timer } from '@shared/models/timer';
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';
import { QuotesMediator, QuotesMediatorEvents } from './quotes.mediator';

export enum SlidwshowStateEnum {
  STARTED = 'started',
  STOPPED = 'stopped'
}

export type SlidwshowStateType = SlidwshowStateEnum.STOPPED | SlidwshowStateEnum.STARTED;

@Injectable()
export class SlideshowService implements OnDestroy {
  public timer: Timer;
  public readonly state$: Observable<SlidwshowStateType>;

  private readonly _state$ = new BehaviorSubject<SlidwshowStateType>(SlidwshowStateEnum.STOPPED);
  private readonly destroy$ = new Subject<void>();

  constructor() {
    // TODO: тянуть из LS
    this.timer = new Timer({ seconds: 6 });
    this.state$ = this._state$.asObservable();
  }

  public get state(): SlidwshowStateType {
    return this._state$.value;
  }

  public start(): void {
    this.checkState(SlidwshowStateEnum.STOPPED);
    this._state$.next(SlidwshowStateEnum.STARTED);
    this.initFinishSubscriptions();
    this.timer.play();
  }

  public stop(): void {
    this.checkState(SlidwshowStateEnum.STARTED);
    this._state$.next(SlidwshowStateEnum.STOPPED);
    this.destroy$.next();
    this.timer.reset();
  }

  public playTimer(): void {
    this.checkState(SlidwshowStateEnum.STARTED);
    this.timer.play();
  }

  public pauseTimer(): void {
    this.checkState(SlidwshowStateEnum.STARTED);
    this.timer.pause();
  }

  public resetTimer(): void {
    this.checkState(SlidwshowStateEnum.STARTED);
    this.timer.reset();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.timer.destroy();
  }

  private initFinishSubscriptions(): void {
    this.timer.finish$
      .pipe(
        tap(() => QuotesMediator.notify(QuotesMediatorEvents.TO_NEXT_QUOTE)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private checkState(state: SlidwshowStateType): void {
    if (this.state !== state) {
      throw new Error(`Slideshow state should be ${state}, not ${this.state}`);
    }
  }
}
