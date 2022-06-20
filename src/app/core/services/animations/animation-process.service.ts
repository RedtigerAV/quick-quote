import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  switchMap
} from 'rxjs';
import { AnimationNameEnum, AnimationNameType } from './animations';

export enum AnimationProcessStateEnum {
  PLAYING = 'playing',
  PENDING = 'pending'
}

export type AnimationProcessStateType = AnimationProcessStateEnum.PLAYING | AnimationProcessStateEnum.PENDING;

@Injectable({ providedIn: 'root' })
export class AnimationProcessService {
  private static _instance: AnimationProcessService;

  private readonly animationsStateMap = new Map<AnimationNameType, BehaviorSubject<AnimationProcessStateType>>();

  constructor() {
    Object.values(AnimationNameEnum).map(value =>
      this.animationsStateMap.set(
        value,
        new BehaviorSubject<AnimationProcessStateType>(AnimationProcessStateEnum.PENDING)
      )
    );
  }

  public static get instance(): AnimationProcessService {
    return AnimationProcessService._instance;
  }

  public init(): void {
    AnimationProcessService._instance = this;
  }

  public getAnimationState$(animation: AnimationNameType): Observable<AnimationProcessStateType> {
    this.checkAnimation(animation);

    return (this.animationsStateMap.get(animation) as BehaviorSubject<AnimationProcessStateType>)
      .asObservable()
      .pipe(distinctUntilChanged());
  }

  public animationsPlaying$(...animations: AnimationNameType[]): Observable<boolean> {
    return combineLatest(animations.map(animation => this.getAnimationState$(animation))).pipe(
      map(states => states.some(state => state === AnimationProcessStateEnum.PLAYING)),
      distinctUntilChanged()
    );
  }

  public animationsDone$(...animations: AnimationNameType[]): Observable<unknown> {
    return of(null).pipe(
      delay(0),
      switchMap(() =>
        combineLatest(animations.map(animation => this.getAnimationState$(animation))).pipe(
          filter(states => states.every(state => state === AnimationProcessStateEnum.PENDING))
        )
      )
    );
  }

  public animationStart(animation: AnimationNameType): void {
    const animationState = this.animationsStateMap.get(animation);

    animationState?.next(AnimationProcessStateEnum.PLAYING);
  }

  public animationDone(animation: AnimationNameType): void {
    const animationState = this.animationsStateMap.get(animation);

    animationState?.next(AnimationProcessStateEnum.PENDING);
  }

  private checkAnimation(animation: AnimationNameType): void {
    if (!animation || !this.animationsStateMap.has(animation)) {
      throw new Error(`Unknown animation ${animation}`);
    }
  }
}
