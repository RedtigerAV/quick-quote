import { map, MonoTypeOperatorFunction, Observable, of, pipe, switchMap, zip } from 'rxjs';
import { AnimationProcessService } from '../services/animations/animation-process.service';
import { AnimationNameType } from '../services/animations/animations';

export function animationDone$(...animations: AnimationNameType[]): Observable<unknown> {
  return AnimationProcessService.instance.animationsDone$(...animations);
}

export function waitUntilAnimationDone<T = any>(...animations: AnimationNameType[]): MonoTypeOperatorFunction<T> {
  return pipe(
    switchMap(entity => zip([of(entity), AnimationProcessService.instance.animationsDone$(...animations)])),
    map(([entity]) => entity)
  );
}
