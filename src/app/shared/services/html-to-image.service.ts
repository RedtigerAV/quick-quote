import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import * as htmlToImage from 'html-to-image';

@Injectable()
export class HtmlToImageService {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  private get body(): HTMLElement {
    return this.document.body;
  }

  public toPng(filter?: (node: HTMLElement) => boolean): Observable<string> {
    return from(htmlToImage.toPng(this.body, { filter }));
  }

  public toJpeg(filter?: (node: HTMLElement) => boolean): Observable<string> {
    return from(htmlToImage.toJpeg(this.body, { filter }));
  }
}
