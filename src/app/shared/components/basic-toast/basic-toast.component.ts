import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { TOAST_DATA } from '@shared/services/toaster/toaster.token';
import { IBasicToastData } from './basic-toast.interface';

@Component({
  selector: 'app-basic-toast',
  templateUrl: './basic-toast.component.html',
  styleUrls: ['./basic-toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicToastComponent implements OnInit {
  constructor(@Inject(TOAST_DATA) public readonly data: IBasicToastData) {}

  ngOnInit(): void {}
}
