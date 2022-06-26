import { Directive } from '@angular/core';

@Directive({ selector: 'app-page-wrapper-title, appPageWrapperTitle, [appPageWrapperTitle]' })
export class PageWrapperTitleDirective {
  constructor() {}
}

@Directive({ selector: 'app-page-wrapper-description, appPageWrapperDescription, [appPageWrapperDescription]' })
export class PageWrapperDescriptionDirective {
  constructor() {}
}
