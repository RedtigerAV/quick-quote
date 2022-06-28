import { take, Observable } from 'rxjs';

/**
 * Get value of hot observable immediately (synchronously)
 * @param source$ Sourse observable
 * @returns value of observable
 */
export function getObservableSnapshot<T>(source$: Observable<T>): T {
  let result: T;

  source$.pipe(take(1)).subscribe(_result => (result = _result));

  // @ts-ignore
  return result;
}

/**
 * Get error of hot observable immediately (synchronously)
 * @param source$ Sourse observable
 * @returns error of observable
 */
export function getObservableErrorSnapshot<T>(source$: Observable<T>): Error {
  let error!: Error;

  source$.pipe(take(1)).subscribe({ error: _error => (error = _error) });

  return error;
}
