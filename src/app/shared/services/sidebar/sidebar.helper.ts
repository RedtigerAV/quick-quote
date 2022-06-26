export class SidebarHelper {
  public static executeCallbacks(callbacks: Array<Function>, ...args: any): void {
    if (!callbacks || !callbacks.length) {
      return;
    }

    callbacks.forEach(callback => callback(...args));
  }
}
