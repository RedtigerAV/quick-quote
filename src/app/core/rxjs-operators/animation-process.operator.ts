import { map, MonoTypeOperatorFunction, Observable, of, pipe, switchMap, take, zip } from 'rxjs';
import { AnimationProcessService } from '../services/animations/animation-process.service';
import { AnimationNameType } from '../services/animations/animations';

export function animationsDone$(...animations: AnimationNameType[]): Observable<unknown> {
  return AnimationProcessService.instance.animationsDone$(...animations).pipe(take(1));
}

export function waitUntilAnimationDone<T = any>(...animations: AnimationNameType[]): MonoTypeOperatorFunction<T> {
  return pipe(
    switchMap(entity => zip([of(entity), animationsDone$(...animations)])),
    map(([entity]) => entity)
  );
}
