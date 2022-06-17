import { Observable } from 'rxjs';

export enum HtmlToImageExtensionEnum {
  PNG = 'png',
  JPEG = 'jpeg'
}

export abstract class HtmlToImageStrategy {
  public abstract readonly extension: HtmlToImageExtensionEnum;

  public abstract toImage<T extends HTMLElement>(
    element: T,
    filter: ((domNode: HTMLElement) => boolean) | undefined
  ): Observable<string>;
}
