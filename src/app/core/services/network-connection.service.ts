import { Inject, Injectable } from '@angular/core';
import { NAVIGATOR, WINDOW } from '@ng-web-apis/common';
import { Observable, fromEvent, merge, map, startWith } from 'rxjs';

export enum ConnectionStatusEnum {
  Offline,
  Online
}

@Injectable({ providedIn: 'root' })
export class NetworkConnectionService {
  public connectionStatus$: Observable<ConnectionStatusEnum>;

  private readonly online$: Observable<ConnectionStatusEnum>;
  private readonly offline$: Observable<ConnectionStatusEnum>;

  constructor(@Inject(WINDOW) window: Window, @Inject(NAVIGATOR) navigator: Navigator) {
    this.online$ = fromEvent(window, 'online').pipe(map(() => ConnectionStatusEnum.Online));
    this.offline$ = fromEvent(window, 'offline').pipe(map(() => ConnectionStatusEnum.Offline));

    this.connectionStatus$ = merge(this.online$, this.offline$).pipe(
      startWith(navigator.onLine ? ConnectionStatusEnum.Online : ConnectionStatusEnum.Offline)
    );
  }
}
