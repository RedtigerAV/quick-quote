import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Nullable } from '@core/types/nullable.type';
import { BehaviorSubject, Observable } from 'rxjs';

enum AnimationStateEnum {
  OPEN = 'open',
  CLOSED = 'close'
}
type AnimationStateType = AnimationStateEnum.OPEN | AnimationStateEnum.CLOSED;

@Component({
  selector: 'app-bar-item',
  templateUrl: './bar-item.component.html',
  styleUrls: ['./bar-item.component.scss'],
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
export class BarItemComponent implements OnInit {
  @Input() public disabled?: Nullable<boolean>;
  @Output() public clickEvent = new EventEmitter<void>();
  public readonly animationState$!: Observable<Nullable<AnimationStateType>>;
  private readonly _animationState$!: BehaviorSubject<Nullable<AnimationStateType>>;
  private _opened = false;

  constructor() {
    this._animationState$ = new BehaviorSubject<Nullable<AnimationStateType>>(null);
    this.animationState$ = this._animationState$.asObservable();
  }

  @Input()
  public get opened(): boolean {
    return this._opened;
  }
  public set opened(value: boolean) {
    const animationState = value ? AnimationStateEnum.OPEN : AnimationStateEnum.CLOSED;

    this._opened = value;
    this._animationState$.next(animationState);
  }

  private get canChangeAnimationState(): boolean {
    return !this.disabled && !this.opened;
  }

  public ngOnInit(): void {}

  public onMouseEnter(): void {
    if (this.canChangeAnimationState) {
      this._animationState$.next(AnimationStateEnum.OPEN);
    }
  }

  public onMouseLeave(): void {
    if (!this.opened) {
      this._animationState$.next(AnimationStateEnum.CLOSED);
    }
  }
}
