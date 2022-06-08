import { Observable } from 'rxjs';

export enum StrategyNameEnum {
  TO_PNG = 'to-png',
  TO_JPEG = 'to-jpeg'
}

export abstract class HtmlToImageStrategy {
  public abstract readonly name: StrategyNameEnum;
  public abstract readonly extension: string;

  public abstract toImage<T extends HTMLElement>(
    element: T,
    filter: ((domNode: HTMLElement) => boolean) | undefined
  ): Observable<string>;
}
