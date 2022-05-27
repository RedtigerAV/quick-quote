import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy, HostListener, ChangeDetectorRef } from '@angular/core';
import { Nullable } from '@core/types/nullable.type';
import { BehaviorSubject, Observable } from 'rxjs';

enum AnimationStateEnum {
  OPEN = 'open',
  CLOSED = 'close'
}
type AnimationStateType = AnimationStateEnum.OPEN | AnimationStateEnum.CLOSED;

@Component({
  selector: 'app-bar-item-content',
  templateUrl: './bar-item-content.component.html',
  styleUrls: ['./bar-item-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // prettier-ignore
    trigger('openClose', [
      state('open', style({
        height: '*',
        opacity: 1,
        marginTop: '4px'
      })),
      state('close', style({
        height: '0',
        opacity: 0,
        marginTop: '0'
      })),
      transition('open <=> close', [animate('.1s ease-in-out')])
    ])
  ]
})
export class BarItemContentComponent implements OnInit {
  public readonly animationState$!: Observable<Nullable<AnimationStateType>>;
  private readonly _animationState$!: BehaviorSubject<Nullable<AnimationStateType>>;
  private _opened = false;
  private _disabled = false;
  private _isMouseOver = false;

  constructor(private readonly cdr: ChangeDetectorRef) {
    this._animationState$ = new BehaviorSubject<Nullable<AnimationStateType>>(null);
    this.animationState$ = this._animationState$.asObservable();
  }

  public get opened(): boolean {
    return this._opened;
  }
  public set opened(value: boolean) {
    const animationState = value ? AnimationStateEnum.OPEN : AnimationStateEnum.CLOSED;

    this._opened = value;
    this._animationState$.next(animationState);
    this.cdr.detectChanges();
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    this._disabled = value;

    if (!value && this._isMouseOver) {
      this._animationState$.next(AnimationStateEnum.OPEN);
    }
    this.cdr.detectChanges();
  }

  private get canChangeAnimationState(): boolean {
    return !this.disabled && !this.opened;
  }

  public ngOnInit(): void {}

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    this._isMouseOver = true;

    if (this.canChangeAnimationState) {
      this._animationState$.next(AnimationStateEnum.OPEN);
    }
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this._isMouseOver = false;

    if (!this.opened) {
      this._animationState$.next(AnimationStateEnum.CLOSED);
    }
  }
}
