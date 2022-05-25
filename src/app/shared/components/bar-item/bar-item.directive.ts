import { AfterContentInit, ContentChild, Directive, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  selector: 'app-bar-item-icon, [app-bar-item-icon], [appBarItemIcon]',
  exportAs: 'appBarItemIcon'
})
export class BarItemIconDirective {}

@Directive({
  selector: 'app-bar-item-text, [app-bar-item-text], [appBarItemText]',
  exportAs: 'appBarItemText'
})
export class BarItemTextDirective {}
