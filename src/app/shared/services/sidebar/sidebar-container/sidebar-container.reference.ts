import { EMPTY, Observable, Subject, takeUntil } from 'rxjs';
import { SidebarHelper } from '../sidebar.helper';

export class SidebarContainerRef {
  private result: any;
  private readonly startClosingCallbacks: Array<(result?: any) => void>;
  private readonly finishClosingCallbacks: Array<(result?: any) => void>;
  private backdropClickCallbacks?: Array<(event: MouseEvent) => void>;
  private backdropClick$?: Observable<MouseEvent>;
  private readonly destroy$: Subject<void>;

  constructor() {
    this.startClosingCallbacks = [];
    this.finishClosingCallbacks = [];

    this.destroy$ = new Subject<void>();
  }

  public backdropClicked(): Observable<MouseEvent> {
    return this.backdropClick$ ? this.backdropClick$ : EMPTY;
  }

  public initBackdrop(backdropClickStream$: Observable<MouseEvent>): void {
    this.backdropClickCallbacks = [];
    this.backdropClick$ = backdropClickStream$;
    this.backdropClick$.pipe(takeUntil(this.destroy$)).subscribe(event => {
      SidebarHelper.executeCallbacks(this.backdropClickCallbacks as [], event);
    });
  }

  public close(result?: any): void {
    this.result = result;

    this.startClosing();
  }

  public addBackdropClickCallback(callback: (event: MouseEvent) => void): void {
    this.backdropClickCallbacks?.push(callback);
  }

  public startClosing(): void {
    SidebarHelper.executeCallbacks(this.startClosingCallbacks, this.result);
  }

  public finishClosing(): void {
    SidebarHelper.executeCallbacks(this.finishClosingCallbacks, this.result);
  }

  public onStartClosing(callback: (result: any) => void): void {
    this.startClosingCallbacks.push(callback);
  }

  public onFinishClosing(callback: (result: any) => void): void {
    this.finishClosingCallbacks.push(callback);
  }

  public destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
