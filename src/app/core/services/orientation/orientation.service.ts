import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { getObservableSnapshot } from '@core/rxjs-operators/helpers/get-observable-snapshot.helper';
import { map, Observable } from 'rxjs';

export enum OrientationEnum {
  LANDSCAPE = 'landscape',
  PORTRAIT = 'portrait'
}

export type OrientationType = OrientationEnum.LANDSCAPE | OrientationEnum.PORTRAIT;

@Injectable({ providedIn: 'root' })
export class OrientationService {
  public readonly isLandscape$: Observable<boolean>;
  public readonly isPortrait$: Observable<boolean>;
  public readonly orientation$: Observable<OrientationType>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.isLandscape$ = breakpointObserver.observe('(orientation: landscape)').pipe(map(({ matches }) => matches));
    this.isPortrait$ = breakpointObserver.observe('(orientation: portrait)').pipe(map(({ matches }) => matches));
    this.orientation$ = this.isPortrait$.pipe(
      map(isPortrait => (isPortrait ? OrientationEnum.PORTRAIT : OrientationEnum.LANDSCAPE))
    );
  }

  public get orientation(): OrientationType {
    return getObservableSnapshot(this.orientation$);
  }
}
