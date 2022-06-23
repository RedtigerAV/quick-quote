import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { HtmlToImageExtensionEnum } from '@core/services/html-to-image/html-to-image.strategy';
import { Nullable } from '@core/types/nullable.type';
import { collapsible, CollapsibleAnimationStateEnum } from '@shared/animations/collapsible.animation';
import { SidebarRef } from '@shared/services/sidebar/sidebar.reference';
import { SIDEBAR_DATA } from '@shared/services/sidebar/sidebar.token';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SlideshowService } from '../../services/slideshow.service';
import { ISettingsData } from './settings.interfaces';
import isEqual from 'lodash-es/isEqual';
import { QuoteTopicsFacade } from '@core/redux/quote-topics/quote-topics.facade';
import { IQuoteTopic } from '@core/models/quote-topic.model';
import { RequestStatusEnum } from '@core/types/request-status.type';
import { AppRoutePath } from 'src/app/app.route-path';
import { IPhotoTopic } from '@core/models/photo-topic.model';
import { PhotoTopicsFacade } from '@core/redux/photo-topics/photo-topics.facade';

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
  public readonly statusEnum = RequestStatusEnum;
  public readonly routePath = AppRoutePath;
  public readonly htmlToImageExtensions = Object.values(HtmlToImageExtensionEnum);
  public readonly expandedItem$: Observable<Nullable<SettingsMenuItemsEnum>>;
  public readonly _expandedItem$ = new BehaviorSubject<Nullable<SettingsMenuItemsEnum>>(null);
  public readonly result$: Observable<ISettingsData>;
  public readonly selectedQuoteTopics$: Observable<Array<IQuoteTopic>>;
  public readonly selectedPhotoTopics$: Observable<Array<IPhotoTopic>>;
  public readonly isSaveButtonVisible$: Observable<boolean>;
  private readonly _result$: BehaviorSubject<ISettingsData>;

  constructor(
    public readonly sidebarRef: SidebarRef,
    public readonly quoteTopicsFacade: QuoteTopicsFacade,
    public readonly photoTopicsFacade: PhotoTopicsFacade,
    private readonly cdr: ChangeDetectorRef,
    @Inject(SIDEBAR_DATA) private readonly data: ISettingsData
  ) {
    this._result$ = new BehaviorSubject<ISettingsData>(data);
    this.result$ = this._result$.asObservable();
    this.selectedQuoteTopics$ = this.result$.pipe(
      map(({ selectedQuoteTopicsIDs: selectedTopicsIDs }) => selectedTopicsIDs),
      map(topicIDs => this.quoteTopicsFacade.topics.filter(({ id }) => topicIDs.includes(id)))
    );
    this.selectedPhotoTopics$ = this.result$.pipe(
      map(({ selectedPhotoTopicsIDs: selectedTopicsIDs }) => selectedTopicsIDs),
      map(topicIDs => this.photoTopicsFacade.topics.filter(({ id }) => topicIDs.includes(id)))
    );
    this.isSaveButtonVisible$ = this.result$.pipe(map(result => !isEqual(result, data)));
    this.expandedItem$ = this._expandedItem$.asObservable();
  }

  ngOnInit(): void {}

  public get result(): ISettingsData {
    return this._result$.value;
  }

  public toUpperCase(str: string): string {
    return str.toUpperCase();
  }

  public getExpandedState([item, expanded]: SettingsMenuItemsEnum[]): CollapsibleAnimationStateEnum {
    return expanded === item ? CollapsibleAnimationStateEnum.Expanded : CollapsibleAnimationStateEnum.Collapsed;
  }

  public getTopicsLabel(selectedTopics: Array<IQuoteTopic> | Array<IPhotoTopic>): string {
    if (!selectedTopics.length) {
      return 'Random';
    }

    return this.compressNames(selectedTopics.map(({ name }) => name));
  }

  public isTopicSelected([topicID, selectedTopics]: [string, Array<IQuoteTopic> | Array<IPhotoTopic>]): boolean {
    return selectedTopics.map(({ id }) => id).includes(topicID);
  }

  public loadQuoteTopics(): void {
    this.quoteTopicsFacade.loadTopics();
  }

  public loadPhotoTopics(): void {
    this.photoTopicsFacade.loadTopics();
  }

  public toggleMenuItem(item: SettingsMenuItemsEnum): void {
    const expanded = this._expandedItem$.value;

    this._expandedItem$.next(item === expanded ? null : item);
    this.cdr.detectChanges();
  }

  public toggleQuoteTopic(topicID: string): void {
    const isTopicSelected = this.result.selectedQuoteTopicsIDs.includes(topicID);

    if (isTopicSelected) {
      this._result$.next({
        ...this.result,
        selectedQuoteTopicsIDs: this.result.selectedQuoteTopicsIDs.filter(id => id !== topicID)
      });
    } else {
      this._result$.next({
        ...this.result,
        selectedQuoteTopicsIDs: [...this.result.selectedQuoteTopicsIDs, topicID]
      });
    }
  }

  public togglePhotoTopic(topicID: string): void {
    const isTopicSelected = this.result.selectedPhotoTopicsIDs.includes(topicID);

    if (isTopicSelected) {
      this._result$.next({
        ...this.result,
        selectedPhotoTopicsIDs: this.result.selectedPhotoTopicsIDs.filter(id => id !== topicID)
      });
    } else {
      this._result$.next({
        ...this.result,
        selectedPhotoTopicsIDs: [...this.result.selectedPhotoTopicsIDs, topicID]
      });
    }
  }

  public selectSlideshowTime(time: number): void {
    this._result$.next({ ...this.result, slideshowTime: time });
    this._expandedItem$.next(null);
  }

  public selectSnapshotExtension(extension: HtmlToImageExtensionEnum): void {
    this._result$.next({ ...this.result, snapshotExtension: extension });
    this._expandedItem$.next(null);
  }

  public save(): void {
    this.sidebarRef.close(this.result);
  }

  private compressNames(names: Array<string>): string {
    if (names.length === 1) {
      return names[0];
    }

    return `${names[0]}, +${names.length - 1}`;
  }
}
