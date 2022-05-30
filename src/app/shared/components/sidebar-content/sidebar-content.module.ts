import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SidebarContentComponent } from './sidebar-content.component';
import {
  SidebarContentBodyDirective,
  SidebarContentCloseButtonDirective,
  SidebarContentTitleDirective
} from './sidebar-content.directive';

@NgModule({
  imports: [CommonModule],
  exports: [
    SidebarContentComponent,
    SidebarContentTitleDirective,
    SidebarContentCloseButtonDirective,
    SidebarContentBodyDirective
  ],
  declarations: [
    SidebarContentComponent,
    SidebarContentTitleDirective,
    SidebarContentCloseButtonDirective,
    SidebarContentBodyDirective
  ],
  providers: []
})
export class SidebarContentModule {}
