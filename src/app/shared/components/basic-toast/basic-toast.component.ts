import { Component, OnInit, ChangeDetectionStrategy, Inject, TemplateRef, Type, Injector } from '@angular/core';
import { Nullable } from '@core/types/nullable.type';
import { ToastRef } from '@shared/services/toaster/toaster.reference';
import { TOAST_DATA } from '@shared/services/toaster/toaster.token';
import { BasicToastTypeEnum, IBasicToastData } from './basic-toast.interface';

enum ContentTypeEnum {
  TEXT,
  COMPONENT,
  TEMPLATE
}

@Component({
  selector: 'app-basic-toast',
  templateUrl: './basic-toast.component.html',
  styleUrls: ['./basic-toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicToastComponent implements OnInit {
  public toastTypeEnum = BasicToastTypeEnum;
  public contentTypeEnum = ContentTypeEnum;
  public contentInjector!: Injector;

  constructor(
    @Inject(TOAST_DATA) public readonly data: IBasicToastData,
    public readonly toast: ToastRef,
    injector: Injector
  ) {
    this.contentInjector = Injector.create({
      providers: [
        {
          provide: ToastRef,
          useValue: toast
        }
      ],
      parent: injector
    });
  }

  ngOnInit(): void {}

  public get content(): any {
    return this.data.content;
  }

  public get contentType(): ContentTypeEnum {
    if (this.data.content instanceof Type) {
      return ContentTypeEnum.COMPONENT;
    } else if (this.data.content instanceof TemplateRef) {
      return ContentTypeEnum.TEMPLATE;
    } else if (typeof this.data.content === 'string') {
      return ContentTypeEnum.TEXT;
    }

    throw new Error('Basic toast: Invalid content');
  }
}
