import { BehaviorSubject, Observable } from 'rxjs';

function lockerMethodStateKey(methodName: string): string {
  return `__lockerDecorator__${methodName}__isLocked`;
}

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

export function lock(target: any, method: Function): void {
  checkLockerMethodKeyExist(target, method);
  (target[lockerMethodStateKey(method.name)] as BehaviorSubject<boolean>).next(true);
}

export function unlock(target: any, method: Function): void {
  checkLockerMethodKeyExist(target, method);
  (target[lockerMethodStateKey(method.name)] as BehaviorSubject<boolean>).next(false);
}

export function isLocked(target: any, method: Function): boolean {
  checkLockerMethodKeyExist(target, method);

  return (target[lockerMethodStateKey(method.name)] as BehaviorSubject<boolean>).value;
}

export function isLocked$(target: any, method: Function): Observable<boolean> {
  checkLockerMethodKeyExist(target, method);

  return target[lockerMethodStateKey(method.name)] as BehaviorSubject<boolean>;
}

function checkLockerMethodKeyExist(target: any, method: Function): void {
  if (!target[lockerMethodStateKey(method.name)]) {
    throw new Error(`@locker decorator does not set on method ${method.name}`);
  }
}
