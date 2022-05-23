import { MediaMatcher } from '@angular/cdk/layout';
import { ViewportSize } from './viewport.config';
import { BehaviorSubject, Observable } from 'rxjs';
import isNil from 'lodash-es/isNil';

interface IMediaQueryListModelBreakpoint {
  from: number;
  to?: number;
}

export interface IMediaQueryListModel {
  name: ViewportSize;
  breakpoint: IMediaQueryListModelBreakpoint;
  mediaMatcher: MediaMatcher;
}

export class MediaQueryListModel implements IMediaQueryListModel {
  public name!: ViewportSize;
  public breakpoint!: IMediaQueryListModelBreakpoint;
  public mediaMatcher!: MediaMatcher;
  public observer$: Observable<boolean>;

  private readonly subject$: BehaviorSubject<boolean>;
  private readonly mediaQueryList: MediaQueryList;

  constructor(data: IMediaQueryListModel) {
    Object.assign(this, data);

    this.mediaQueryList = this.mediaMatcher.matchMedia(this.createMediaQuery(this.breakpoint.from, this.breakpoint.to));
    this.subject$ = new BehaviorSubject<boolean>(this.getInitialMediaQueryValue(this.mediaQueryList));
    this.observer$ = this.subject$.asObservable();

    this.mediaQueryList.addEventListener('change', this.handleMediaQueryChange.bind(this));
  }

  public destroy(): void {
    this.mediaQueryList?.removeListener(this.handleMediaQueryChange);
  }

  private handleMediaQueryChange(event: MediaQueryListEvent): void {
    this.subject$.next(event.matches);
  }

  private getInitialMediaQueryValue(event: MediaQueryList): boolean {
    return event.matches;
  }

  private createMediaQuery(startSize: number, finishSize?: number): string {
    if (!isNil(startSize) && !isNil(finishSize)) {
      return `(min-width: ${startSize}px) and (max-width: ${finishSize - 0.1}px)`;
    }

    if (!isNil(startSize)) {
      return `(min-width: ${startSize}px)`;
    }

    throw Error('empty arguments');
  }
}
