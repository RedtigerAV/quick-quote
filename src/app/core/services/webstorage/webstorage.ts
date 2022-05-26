export abstract class WebStorage {
  public static getKey = (rawKey: string) => `qq_${rawKey}`;

  public abstract getItem(key: string): any;

  public abstract setItem(key: string, value: any): void;

  public abstract removeItem(key: string): void;
}
