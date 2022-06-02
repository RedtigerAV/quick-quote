import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BackgroundAnimationService {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  public turnOnAnimation(): void {
    this.document.body.classList.remove('without-animation');
  }

  public turnOffAnimation(): void {
    this.document.body.classList.add('without-animation');
  }
}
