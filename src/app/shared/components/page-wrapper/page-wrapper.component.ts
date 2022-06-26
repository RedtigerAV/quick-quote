import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AppRoutePath } from 'src/app/app.route-path';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageWrapperComponent implements OnInit {
  @Input() public centerContent = false;
  @Input() public showQuotesLink = true;

  public readonly appRoutePath = AppRoutePath;

  constructor() {}

  ngOnInit(): void {}
}
