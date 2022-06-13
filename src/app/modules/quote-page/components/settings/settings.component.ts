import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SidebarRef } from '@shared/services/sidebar/sidebar.reference';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  constructor(public readonly sidebarRef: SidebarRef) {}

  ngOnInit(): void {}
}
