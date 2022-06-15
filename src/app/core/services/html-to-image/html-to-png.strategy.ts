import { from, Observable } from 'rxjs';
import { HtmlToImageStrategy, HtmlToImageExtensionEnum } from './html-to-image.strategy';
import * as htmlToImage from 'html-to-image';

export class HtmlToPngStrategy extends HtmlToImageStrategy {
  public readonly extension = HtmlToImageExtensionEnum.PNG;

  public toImage<T extends HTMLElement>(
    element: T,
    filter: ((domNode: HTMLElement) => boolean) | undefined
  ): Observable<string> {
    return from(htmlToImage.toPng(element, { filter }));
  }
}
