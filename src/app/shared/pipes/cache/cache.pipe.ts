import { Pipe, PipeTransform } from '@angular/core';

/***
 * Caching values or objects and prevent from additional change detection cycle
 * @param value {any} - value for caching
 * @param handler {any} - called method
 * @param context {any} - context environment
 * @example 1 | cache: numToString: this
 */
@Pipe({
  name: 'cache'
})
export class CachePipe implements PipeTransform {
  // tslint:disable-next-line: no-any
  public transform(value: any, handler: (v: any) => any, context?: any): any {
    if (context) {
      return handler.call(context, value);
    }

    return handler(value);
  }
}
