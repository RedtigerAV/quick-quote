import { take, Observable } from 'rxjs';

export function getObservableSnapshot<T>(source$: Observable<T>): T {
  let result: T;

  source$.pipe(take(1)).subscribe(_result => (result = _result));

  // @ts-ignore
  return result;
}

export function getObservableErrorSnapshot<T>(source$: Observable<T>): Error {
  let error!: Error;

  source$.pipe(take(1)).subscribe({ error: _error => (error = _error) });

  return error;
}
