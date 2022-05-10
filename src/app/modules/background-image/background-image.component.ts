import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-background-image',
  templateUrl: './background-image.component.html',
  styleUrls: ['./background-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundImageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
