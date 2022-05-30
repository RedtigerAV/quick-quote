import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { SidebarRef } from '@shared/services/sidebar/sidebar.reference';
import { SIDEBAR_DATA } from '@shared/services/sidebar/sidebar.token';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksComponent implements OnInit {
  constructor(public readonly sidebarRef: SidebarRef, @Inject(SIDEBAR_DATA) public readonly data: Object) {}

  ngOnInit(): void {}
}
