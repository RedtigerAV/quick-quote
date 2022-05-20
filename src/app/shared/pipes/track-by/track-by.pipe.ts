import { Pipe, PipeTransform, TrackByFunction } from '@angular/core';
import get from 'lodash-es/get';

// tslint:disable: no-any
interface ITrackByFunctionCache {
  [propertyName: string]: TrackByFunction<any>;
}

const trackByCache: ITrackByFunctionCache = Object.create(null);
const INDEX_PROPERTY_NAME = '$index';

// todo tests (common)
/***
 *    Common function for retrieving object's field. For usage with trackBy pipe
 *    @param {string | '$index'} - object's field (or '$index' - element's index in array)
 *
 *    @example  <div *ngFor="let res of data; trackBy: 'id' | trackBy" >
 *
 *    @return { TrackByFunction<any> }
 */
@Pipe({
  name: 'trackBy'
})
export class TrackByPipe implements PipeTransform {
  public transform(propertyName: string): TrackByFunction<any> {
    if (propertyName === INDEX_PROPERTY_NAME) {
      if (!trackByCache[propertyName]) {
        trackByCache[propertyName] = function trackByProperty(index: number): any {
          return index;
        };
      }
    } else {
      if (!trackByCache[propertyName]) {
        trackByCache[propertyName] = function trackByProperty<T>(_index: number, item: T): any {
          return get(item, propertyName);
        };
      }
    }

    return trackByCache[propertyName];
  }
}
