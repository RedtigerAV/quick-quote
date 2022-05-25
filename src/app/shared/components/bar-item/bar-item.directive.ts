import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  HostBinding,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { Nullable } from '@core/types/nullable.type';
import { BarItemContentComponent } from './bar-item-content.component';

@Directive({
  selector: 'app-bar-item, [app-bar-item], [appBarItem]',
  exportAs: 'appBarItem'
})
export class BarItemDirective implements OnChanges, AfterContentInit {
  @ContentChild(BarItemContentComponent) barItemContent!: BarItemContentComponent;
  @Input() @HostBinding('disabled') disabled!: Nullable<boolean>;
  @HostBinding('class.bar-item') barItemClass = true;

  private _opened = false;

  @Input()
  public get opened(): boolean {
    return this._opened;
  }
  public set opened(value: boolean) {
    this._opened = value;

    this.updateContentOpenedState();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled'] && !changes['disabled'].firstChange) {
      this.updateContentDisabledState();
    }

    if (changes['opened'] && !changes['opened'].firstChange) {
      this.updateContentOpenedState();
    }
  }

  public ngAfterContentInit(): void {
    this.updateContent();
  }

  private updateContent(): void {
    this.updateContentDisabledState();
    this.updateContentOpenedState();
  }

  private updateContentDisabledState(): void {
    if (this.barItemContent) {
      this.barItemContent.disabled = !!this.disabled;
    }
  }

  private updateContentOpenedState(): void {
    if (this.barItemContent) {
      this.barItemContent.opened = !!this.opened;
    }
  }
}

@Directive({
  selector: 'app-bar-item-list, [app-bar-item-list], [appBarItemList]',
  exportAs: 'appBarItemList'
})
export class BarItemListDirective implements OnChanges, AfterContentInit {
  @Input() opened: Nullable<boolean> = false;
  @HostBinding('class.bar-item__list') barItemListClass = true;
  @ContentChildren(BarItemDirective) barItems!: QueryList<BarItemDirective>;

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

@Directive({
  selector: 'app-bar-item-icon, [app-bar-item-icon], [appBarItemIcon]',
  exportAs: 'appBarItemIcon'
})
export class BarItemIconDirective {}

@Directive({
  selector: 'app-bar-item-text, [app-bar-item-text], [appBarItemText]',
  exportAs: 'appBarItemText'
})
export class BarItemTextDirective {}
