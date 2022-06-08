import { from, Observable } from 'rxjs';
import { HtmlToImageStrategy, StrategyNameEnum } from './html-to-image.strategy';
import * as htmlToImage from 'html-to-image';

export class HtmlToJpegStrategy extends HtmlToImageStrategy {
  public readonly name = StrategyNameEnum.TO_JPEG;
  public readonly extension = 'jpeg';

  public toImage<T extends HTMLElement>(
    element: T,
    filter: ((domNode: HTMLElement) => boolean) | undefined
  ): Observable<string> {
    return from(htmlToImage.toJpeg(element, { filter }));
  }
}
