import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Nullable } from '@core/types/nullable.type';

const ROOT_LOADER_ANIMATION_TIME = 700;
const LOADER_ID = 'root-loader';

@Injectable({ providedIn: 'root' })
export class RootLoaderService {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  private get loader(): Nullable<HTMLElement> {
    return this.document.getElementById(LOADER_ID);
  }

  public turnOffLoader(): void {
    (this.loader as HTMLElement).style.opacity = '0';

    setTimeout(() => this.loader?.remove(), ROOT_LOADER_ANIMATION_TIME);
  }
}
