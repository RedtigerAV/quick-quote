import { AnimationEvent, trigger } from '@angular/animations';
import {
  Component,
  ChangeDetectionStrategy,
  Type,
  TemplateRef,
  Injector,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { IAnimationParams, IAnimationState } from '@shared/interfaces/animation.interface';
import { Observable, Subject } from 'rxjs';
import { SidebarPositionEnum } from '../sidebar.interface';
import { SidebarRef } from '../sidebar.reference';
import { AnimationStateEnum, backdropFade, panelFade } from './sidebar-container.animation';

export interface ISidebarContainer {
  backdropClick$: Observable<MouseEvent>;
  leaveAnimationDone$: Observable<void>;
  startLeaveAnimation(): void;
}

enum ContentTypeEnum {
  COMPONENT = 'component',
  TEMPLATE = 'template'
}

type ContentType = ContentTypeEnum.COMPONENT | ContentTypeEnum.TEMPLATE;

@Component({
  selector: 'app-sidebar-container',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('backdropFade', backdropFade), trigger('panelFade', panelFade)]
})
export class SidebarContainerComponent implements ISidebarContainer, AfterViewInit {
  public readonly sidebarPositionEnum = SidebarPositionEnum;
  public readonly contentTypeEnum = ContentTypeEnum;
  public readonly leaveAnimationDone$: Observable<void>;
  public readonly _leaveAnimationDone$: Subject<void>;
  public readonly backdropClick$: Observable<MouseEvent>;
  public animationState = AnimationStateEnum.LEAVE;
  private readonly _backdropClick$: Subject<MouseEvent>;

  constructor(
    public readonly injector: Injector,
    public readonly sidebarRef: SidebarRef,
    private readonly cdr: ChangeDetectorRef
  ) {
    this._backdropClick$ = new Subject<MouseEvent>();
    this.backdropClick$ = this._backdropClick$.asObservable();

    this._leaveAnimationDone$ = new Subject<void>();
    this.leaveAnimationDone$ = this._leaveAnimationDone$.asObservable();
  }

  public get panelWidth(): string | undefined {
    if (typeof this.sidebarRef.width === 'number') {
      return `${this.sidebarRef.width}px`;
    }

    return this.sidebarRef.width;
  }

  public get contentType(): ContentType {
    if (this.sidebarRef.content instanceof Type) {
      return ContentTypeEnum.COMPONENT;
    } else if (this.sidebarRef.content instanceof TemplateRef) {
      return ContentTypeEnum.TEMPLATE;
    }

    throw new Error('Sidebar: Invalid content');
  }

  public get panelFadeInAnimation(): IAnimationState {
    return this.animationState === AnimationStateEnum.ENTER
      ? { value: AnimationStateEnum.ENTER }
      : { value: AnimationStateEnum.LEAVE, params: this.panelFadeInAnimationParams };
  }

  private get panelFadeInAnimationParams(): IAnimationParams {
    if (this.sidebarRef.position === SidebarPositionEnum.LEFT) {
      return { translate: 'translate3d(-100%, 0, 0)' };
    }

    return { translate: 'translate3d(100%, 0, 0)' };
  }

  public ngAfterViewInit(): void {
    this.startEnterAnimation();
  }

  public startEnterAnimation(): void {
    this.animationState = AnimationStateEnum.ENTER;
    this.cdr.detectChanges();
  }

  public startLeaveAnimation(): void {
    this.animationState = AnimationStateEnum.LEAVE;
    this.cdr.detectChanges();
  }

  public leaveAnimationDone(event: AnimationEvent): void {
    if (event.fromState === AnimationStateEnum.ENTER && event.toState === AnimationStateEnum.LEAVE) {
      this._leaveAnimationDone$.next();
    }
  }

  public onBackdropClick(event: MouseEvent): void {
    this._backdropClick$.next(event);
  }
}
