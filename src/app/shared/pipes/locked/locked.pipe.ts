import { Pipe, PipeTransform } from '@angular/core';
import { isLocked$ } from '@shared/decorators/locker.decorator';
import { Observable } from 'rxjs';

/**
 * @see locker decorator
 */
@Pipe({
  name: 'locked'
})
export class LockedPipe implements PipeTransform {
  public transform(method: Function, target: any): Observable<boolean> {
    return isLocked$(target, method);
  }
}
