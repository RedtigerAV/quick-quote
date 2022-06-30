import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

/**
 * Service for disabling background animations when photos are loaded
 */
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
