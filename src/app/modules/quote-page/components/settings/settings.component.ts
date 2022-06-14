import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { Nullable } from '@core/types/nullable.type';
import { collapsible, CollapsibleAnimationStateEnum } from '@shared/animations/collapsible.animation';
import { SidebarRef } from '@shared/services/sidebar/sidebar.reference';
import { SIDEBAR_DATA } from '@shared/services/sidebar/sidebar.token';
import { BehaviorSubject, Observable } from 'rxjs';
import { SlideshowService } from '../../services/slideshow.service';
import { ISettingsData } from './settings.interfaces';

enum SettingsMenuItemsEnum {
  SLIDESHOW,
  SNAPSHOT,
  QUOTE_TOPICS,
  PHOTO_TOPICS
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [collapsible(400)]
})
export class SettingsComponent implements OnInit {
  public readonly slideshowTimes = SlideshowService.availableTimes;
  public readonly itemsEnum = SettingsMenuItemsEnum;
  public readonly expandedItem$: Observable<Nullable<SettingsMenuItemsEnum>>;
  public readonly _expandedItem$ = new BehaviorSubject<Nullable<SettingsMenuItemsEnum>>(null);
  public readonly result$: Observable<ISettingsData>;
  private readonly _result$: BehaviorSubject<ISettingsData>;

  constructor(
    public readonly sidebarRef: SidebarRef,
    private readonly cdr: ChangeDetectorRef,
    @Inject(SIDEBAR_DATA) private readonly data: ISettingsData
  ) {
    this._result$ = new BehaviorSubject<ISettingsData>(data);
    this.result$ = this._result$.asObservable();
    this.expandedItem$ = this._expandedItem$.asObservable();
  }

  ngOnInit(): void {}

  public get result(): ISettingsData {
    return this._result$.value;
  }

  public getExpandedState([item, expanded]: SettingsMenuItemsEnum[]): CollapsibleAnimationStateEnum {
    return expanded === item ? CollapsibleAnimationStateEnum.Expanded : CollapsibleAnimationStateEnum.Collapsed;
  }

  public toggle(item: SettingsMenuItemsEnum): void {
    const expanded = this._expandedItem$.value;

    this._expandedItem$.next(item === expanded ? null : item);
    this.cdr.detectChanges();
  }

  public selectSlideshowTime(time: number): void {
    this._result$.next({ ...this.result, slideshowTime: time });
    this._expandedItem$.next(null);
  }
}
