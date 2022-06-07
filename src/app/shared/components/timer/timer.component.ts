import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Timer, TimerStateEnum } from '@shared/models/timer';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnChanges {
  @Input() public size = 40;
  @Input() public strokeWidth = 2;
  @Input() public timer!: Timer;

  public radius!: number;
  public dasharray!: number;
  public leftDasharray$!: Observable<number>;

  constructor() {}

  public ngOnInit(): void {
    this.recalculateCircle();
    this.leftDasharray$ = combineLatest([this.timer.left$, this.timer.state$]).pipe(
      map(([left, state]) => {
        if (state === TimerStateEnum.RESET) {
          return this.calculateLeftDasharray(left);
        }

        return this.calculateLeftDasharray(left - 1);
      })
    );
  }

  public ngOnChanges({ size, strokeWidth }: SimpleChanges): void {
    if (!size.firstChange && !strokeWidth.firstChange) {
      this.recalculateCircle();
    }
  }

  private recalculateCircle(): void {
    this.radius = this.size / 2 - this.strokeWidth;
    this.dasharray = Math.ceil(2 * Math.PI * this.radius);
  }

  private calculateLeftDasharray(left: number): number {
    return (left / this.timer.seconds) * this.dasharray;
  }
}
