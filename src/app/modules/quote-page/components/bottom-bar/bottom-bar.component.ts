import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Nullable } from '@core/types/nullable.type';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomBarComponent {
  @Input() opened: Nullable<boolean> = false;
}
