import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ContentChildren,
  AfterContentInit,
  QueryList,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Nullable } from '@core/types/nullable.type';
import { BarItemDirective } from '@shared/components/bar-item/bar-item.directive';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomBarComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() opened: Nullable<boolean> = false;
  @ContentChildren(BarItemDirective) barItems!: QueryList<BarItemDirective>;

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    const opened = changes['opened']?.currentValue;
    const firstChange = changes['opened']?.firstChange;

    if (!firstChange && opened !== undefined) {
      this.castOpenedState(opened);
    }
  }

  public ngAfterContentInit(): void {
    this.castOpenedState(this.opened as boolean);
  }

  private castOpenedState(opened: boolean): void {
    const barItems = this.barItems.toArray();

    barItems.forEach(item => (item.opened = opened));
  }
}
