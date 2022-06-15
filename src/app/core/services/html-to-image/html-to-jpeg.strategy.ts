import { from, Observable } from 'rxjs';
import { HtmlToImageStrategy, HtmlToImageExtensionEnum } from './html-to-image.strategy';
import * as htmlToImage from 'html-to-image';

export class HtmlToJpegStrategy extends HtmlToImageStrategy {
  public readonly extension = HtmlToImageExtensionEnum.JPEG;

  public toImage<T extends HTMLElement>(
    element: T,
    filter: ((domNode: HTMLElement) => boolean) | undefined
  ): Observable<string> {
    return from(htmlToImage.toJpeg(element, { filter }));
  }
}
