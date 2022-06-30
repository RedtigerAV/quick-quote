import { Inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { HtmlToImageStrategy, HtmlToImageExtensionEnum } from './html-to-image.strategy';
import { WebStorageService } from '@core/services/webstorage/webstorage.service';
import { HtmlToPngStrategy } from './html-to-png.strategy';
import { HtmlToJpegStrategy } from './html-to-jpeg.strategy';
import * as FileSaver from 'file-saver';

/**
 * Service for managing approaches to generating images from html
 */
@Injectable({ providedIn: 'root' })
export class HtmlToImageService {
  public static skipHtmlToImageClass = 'qq-skip-html-to-image';
  private readonly filter: (node: HTMLElement) => boolean = node =>
    !node.classList?.contains(HtmlToImageService.skipHtmlToImageClass);
  private strategy!: HtmlToImageStrategy;
  private readonly lsKey = 'html-to-image';

  constructor(@Inject(DOCUMENT) private readonly document: Document, private readonly webstorage: WebStorageService) {
    const strategyFromLS: HtmlToImageExtensionEnum = webstorage.local.getItem(this.lsKey);

    this.strategy = this.getStrategyByExtension(strategyFromLS);
  }

  public getStrategy(): HtmlToImageStrategy {
    return this.strategy;
  }

  public setStrategy(extension: HtmlToImageExtensionEnum): void {
    this.strategy = this.getStrategyByExtension(extension);

    this.webstorage.local.setItem(this.lsKey, extension);
  }

  public saveImage(name: string): Observable<void> {
    return this.strategy.toImage(this.document.body, this.filter).pipe(
      tap(dataUrl => FileSaver.saveAs(dataUrl, `${name}.${this.strategy.extension}`)),
      map(() => void 0)
    );
  }

  private getStrategyByExtension(extension: HtmlToImageExtensionEnum): HtmlToImageStrategy {
    switch (extension) {
      case HtmlToImageExtensionEnum.PNG:
        return new HtmlToPngStrategy();
      case HtmlToImageExtensionEnum.JPEG:
      default:
        return new HtmlToJpegStrategy();
    }
  }
}
