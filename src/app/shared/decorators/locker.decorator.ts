import { BehaviorSubject, Observable } from 'rxjs';

function lockerMethodStateKey(methodName: string): string {
  return `__lockerDecorator__${methodName}__isLocked`;
}

/**
 * Wraps a method in a decorator that allows or prohibits the execution of the original method
 * @returns MethodDecorator
 */
export function locker(): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const originalMethod: Function = descriptor.value;

    target[lockerMethodStateKey(propertyKey as string)] = new BehaviorSubject<boolean>(false);

    descriptor.value = function decorateMethod(this: any, ...params: any[]): void {
      if (!isLocked(this, descriptor.value)) {
        originalMethod.call(this, ...params);
      }
    };

    Object.defineProperty(descriptor.value, 'name', { value: propertyKey, configurable: true });
  };
}

/**
 * Blocks execution of the method
 * @param target class of object that contains the method
 * @param method method to be called
 */
export function lock(target: any, method: Function): void {
  checkLockerMethodKeyExist(target, method);
  (target[lockerMethodStateKey(method.name)] as BehaviorSubject<boolean>).next(true);
}

/**
 * Unblocks the execution of the method
 * @param target class of object that contains the method
 * @param method method to be called
 */
export function unlock(target: any, method: Function): void {
  checkLockerMethodKeyExist(target, method);
  (target[lockerMethodStateKey(method.name)] as BehaviorSubject<boolean>).next(false);
}

/**
 * Check the method state (blocked or not) sync
 * @returns {boolean}
 */
export function isLocked(target: any, method: Function): boolean {
  checkLockerMethodKeyExist(target, method);

  return (target[lockerMethodStateKey(method.name)] as BehaviorSubject<boolean>).value;
}

/**
 * Get the observable, that emits the method state (blocked or not)
 * @returns {boolean}
 */
export function isLocked$(target: any, method: Function): Observable<boolean> {
  checkLockerMethodKeyExist(target, method);

  return target[lockerMethodStateKey(method.name)] as BehaviorSubject<boolean>;
}

function checkLockerMethodKeyExist(target: any, method: Function): void {
  if (!target[lockerMethodStateKey(method.name)]) {
    throw new Error(`@locker decorator does not set on method ${method.name}`);
  }
}
