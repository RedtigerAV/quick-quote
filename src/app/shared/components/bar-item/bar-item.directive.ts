import { Directive } from '@angular/core';

@Directive({
  selector: 'app-bar-item-icon, [app-bar-item-icon], [appBarItemIcon]',
  exportAs: 'app-bar-item-icon'
})
export class BarItemIconDirective {}

@Directive({
  selector: 'app-bar-item-text, [app-bar-item-text], [appBarItemText]',
  exportAs: 'app-bar-item-text'
})
export class BarItemTextDirective {}
