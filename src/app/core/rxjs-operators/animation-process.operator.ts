import { map, MonoTypeOperatorFunction, Observable, of, pipe, switchMap, take, zip } from 'rxjs';
import { AnimationProcessService } from '../services/animations/animation-process.service';
import { AnimationNameType } from '../services/animations/animations';

/**
 * Track when all animations are done
 * @param animations desired animations
 * @returns emits when animations are done
 */
export function animationsDone$(...animations: AnimationNameType[]): Observable<unknown> {
  return AnimationProcessService.instance.animationsDone$(...animations).pipe(take(1));
}

/**
 * Delay observable emits while animations are not done
 * @param animations desired animations
 * @returns observable value
 */
export function waitUntilAnimationDone<T = any>(...animations: AnimationNameType[]): MonoTypeOperatorFunction<T> {
  return pipe(
    switchMap(entity => zip([of(entity), animationsDone$(...animations)])),
    map(([entity]) => entity)
  );
}
