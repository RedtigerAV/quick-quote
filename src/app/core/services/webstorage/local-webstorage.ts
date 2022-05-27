import { WebStorage } from './webstorage';

export class LocalWebStorage extends WebStorage {
  public getItem(key: string): any {
    try {
      const item = localStorage.getItem(WebStorage.getKey(key));

      return !!item ? JSON.parse(item) : undefined;
    } catch (e) {
      console.error(`can't parse local storage element: ${key}`);

      return null;
    }
  }
  public setItem(key: string, value: any): void {
    try {
      const item = JSON.stringify(value);

      localStorage.setItem(WebStorage.getKey(key), item);
    } catch (e) {
      console.error(`can't set local storage element: ${key}, ${value}`);
    }
  }

  public removeItem(key: string): void {
    try {
      localStorage.removeItem(WebStorage.getKey(key));
    } catch (e) {
      console.error(`can't remove local storage element: ${key}`);
    }
  }
}
