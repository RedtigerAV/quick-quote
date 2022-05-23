import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';

export function zoneAware<T = any>(zone: NgZone): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>) =>
    new Observable<T>(observer => {
      return source.subscribe({
        next: x => zone.run(() => observer.next(x)),
        error: err => observer.error(err),
        complete: () => observer.complete()
      });
    });
}
