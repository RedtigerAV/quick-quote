import {
  BehaviorSubject,
  bufferCount,
  delay,
  filter,
  map,
  merge,
  Observable,
  Subject,
  takeUntil,
  takeWhile,
  tap,
  timer
} from 'rxjs';

const EMIT_TIME = 200;
const EMITS_IN_SECOND = 1000 / EMIT_TIME;

export enum TimerStateEnum {
  PLAY = 'play',
  PAUSE = 'pause',
  RESET = 'reset'
}

export type TimerStateType = TimerStateEnum.PLAY | TimerStateEnum.PAUSE | TimerStateEnum.RESET;

export class Timer {
  // Refers to time in seconds. Emits value every second
  public readonly left$: Observable<number>;
  public readonly state$: Observable<TimerStateType>;
  public readonly finish$: Observable<void>;
  public readonly seconds: number;

  private readonly _left$: BehaviorSubject<number>;
  private readonly _state$: BehaviorSubject<TimerStateType>;
  private readonly destroy$: Subject<void>;

  constructor({ seconds }: { seconds: number }) {
    this.seconds = seconds;
    this._left$ = new BehaviorSubject<number>(seconds);
    this._state$ = new BehaviorSubject<TimerStateType>(TimerStateEnum.RESET);
    this.destroy$ = new Subject();

    this.left$ = this._left$.asObservable();
    this.state$ = this._state$.asObservable();
    this.finish$ = this.left$.pipe(
      filter(value => value === 0),
      map(() => void 0),
      delay(0)
    );
  }

  public get left(): number {
    return this._left$.value;
  }

  public get state(): TimerStateType {
    return this._state$.value;
  }

  public play(): void {
    const lastState = this._state$.value;

    this._state$.next(TimerStateEnum.PLAY);

    if (lastState === TimerStateEnum.RESET) {
      this.init();
    }
  }

  public pause(): void {
    this._state$.next(TimerStateEnum.PAUSE);
  }

  public reset(): void {
    this.destroy();
    this._left$.next(this.seconds);
    this._state$.next(TimerStateEnum.RESET);
  }

  public destroy(): void {
    this.destroy$.next();
  }

  private init(): void {
    timer(0, EMIT_TIME)
      .pipe(
        filter(() => this.state === TimerStateEnum.PLAY),
        bufferCount(EMITS_IN_SECOND, EMITS_IN_SECOND),
        map(() => this.left - 1),
        takeWhile(() => this.state !== TimerStateEnum.RESET),
        takeUntil(merge(this.destroy$, this.finish$))
      )
      .subscribe(left => this._left$.next(left));
  }
}
