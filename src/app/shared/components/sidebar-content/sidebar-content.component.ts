import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
