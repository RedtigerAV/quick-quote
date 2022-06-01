import { Directive } from '@angular/core';

@Directive({
  selector: 'app-sidebar-content-title, [app-sidebar-content-title], [appSidebarContentTitle]',
  exportAs: 'appSidebarContentTitle'
})
export class SidebarContentTitleDirective {}

@Directive({
  selector: 'app-sidebar-content-close, [app-sidebar-content-close], [appSidebarContentClose]',
  exportAs: 'appSidebarContentClose'
})
export class SidebarContentCloseButtonDirective {}

@Directive({
  selector: 'app-sidebar-content-body, [app-sidebar-content-body], [appSidebarContentBody]',
  exportAs: 'appSidebarContentBody'
})
export class SidebarContentBodyDirective {}
