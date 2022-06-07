import { trigger } from '@angular/animations';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Injector } from '@angular/core';
import { ToastPositionEnum, ToastPositionType } from '../toaster.interface';
import { ToastRef } from '../toaster.reference';
import { TOAST_DATA } from '../toaster.token';
import { nestedTransition, shrinkInTransition, shrinkOutTransition } from './toaster-container.animation';

type ToastsCollections = Record<ToastPositionType, ToastRef[]>;

const MAX_TOASTS_AMOUNT_DEFAULT = 3;
const topPositions: ToastPositionType[] = [
  ToastPositionEnum.TOP_RIGHT,
  ToastPositionEnum.TOP_CENTER,
  ToastPositionEnum.TOP_LEFT
];

@Component({
  selector: 'app-toaster-container',
  templateUrl: './toaster-container.component.html',
  styleUrls: ['./toaster-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('nested', [nestedTransition]), trigger('shrink', [shrinkInTransition, shrinkOutTransition])]
})
export class ToasterContainerComponent {
  public readonly toastsCollections: ToastsCollections;

  constructor(private readonly cdr: ChangeDetectorRef, private readonly injector: Injector) {
    this.toastsCollections = {
      [ToastPositionEnum.TOP_LEFT]: [],
      [ToastPositionEnum.TOP_CENTER]: [],
      [ToastPositionEnum.TOP_RIGHT]: [],
      [ToastPositionEnum.BOTTOM_LEFT]: [],
      [ToastPositionEnum.BOTTOM_CENTER]: [],
      [ToastPositionEnum.BOTTOM_RIGHT]: []
    };
  }

  public addToast(toast: ToastRef): void {
    const collection = this.toastsCollections[toast.position as ToastPositionType];

    if (topPositions.includes(toast.position as ToastPositionType)) {
      collection.unshift(toast);
    } else {
      collection.push(toast);
    }

    if (collection.length > MAX_TOASTS_AMOUNT_DEFAULT) {
      if (topPositions.includes(toast.position as ToastPositionType)) {
        collection.pop();
      } else {
        collection.shift();
      }
    }

    this.cdr.detectChanges();
  }

  public deleteToast(toast: ToastRef): void {
    const collection = this.toastsCollections[toast.position as ToastPositionType];
    const toastIndex = collection.findIndex(({ id }) => id === toast.id);

    if (toastIndex >= 0) {
      collection.splice(toastIndex, 1);
    }

    this.cdr.detectChanges();
  }

  public createInjector(toast: ToastRef): Injector {
    return Injector.create({
      providers: [
        {
          provide: ToastRef,
          useValue: toast
        },
        {
          provide: TOAST_DATA,
          useValue: toast.data
        }
      ],
      parent: this.injector
    });
  }
}
