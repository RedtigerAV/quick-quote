import { Inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { HtmlToImageStrategy, StrategyNameEnum } from './html-to-image.strategy';
import { WebStorageService } from '@core/services/webstorage/webstorage.service';
import { HtmlToPngStrategy } from './html-to-png.strategy';
import { HtmlToJpegStrategy } from './html-to-jpeg.strategy';
import * as FileSaver from 'file-saver';

@Injectable({ providedIn: 'root' })
export class HtmlToImageService {
  public static skipHtmlToImageClass = 'qq-skip-html-to-image';
  private readonly filter: (node: HTMLElement) => boolean = node =>
    !node.classList?.contains(HtmlToImageService.skipHtmlToImageClass);
  private strategy!: HtmlToImageStrategy;
  private lsKey = 'html-to-image';

  constructor(@Inject(DOCUMENT) private readonly document: Document, private readonly webstorage: WebStorageService) {
    const strategyFromLS: StrategyNameEnum = webstorage.local.getItem(this.lsKey);

    switch (strategyFromLS) {
      case StrategyNameEnum.TO_PNG:
        this.strategy = new HtmlToPngStrategy();
        break;
      case StrategyNameEnum.TO_JPEG:
      default:
        this.strategy = new HtmlToJpegStrategy();
        break;
    }
  }

  public setStrategy(strategy: HtmlToImageStrategy): void {
    this.strategy = strategy;

    this.webstorage.local.setItem(this.lsKey, strategy.name);
  }

  public saveImage(name: string): Observable<void> {
    return this.strategy.toImage(this.document.body, this.filter).pipe(
      tap(dataUrl => FileSaver.saveAs(dataUrl, `${name}.${this.strategy.extension}`)),
      map(() => void 0)
    );
  }
}
