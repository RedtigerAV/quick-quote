import { BehaviorSubject, combineLatest, filter, finalize, map, Observable, take, tap } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QuotesLoaderService } from './services/quotes-loader.service';
import { ViewportService } from '@core/services/viewport/viewport.service';
import { lock, locker, unlock } from '@shared/decorators/locker.decorator';
import { HtmlToImageService } from '@core/services/html-to-image/html-to-image.service';
import { Platform } from '@angular/cdk/platform';
import { BookmarksFacade } from '@core/redux/bookmarks/bookmarks.facade';
import { AnimationProcessService } from '@core/services/animations/animation-process.service';
import { AnimationNameEnum } from '@core/services/animations/animations';
import { DownloadPhotoService } from './services/dowload-photo.service';
import { BookmarksService } from './services/bookmarks.service';
import { ActionsStateEnum, ActionsStateType } from './quote-page.interfaces';
import { SlideshowService, SlidwshowStateEnum } from './services/slideshow.service';
import { QuotesMediator, QuotesMediatorEvents } from './services/quotes.mediator';
import { AnimationEvent } from '@angular/animations';
import { SettingsService } from './services/settings.service';
import isNumber from 'lodash-es/isNumber';
import { ToasterService } from '@shared/services/toaster/toaster.service';
import { BasicToastError, BasicToastInfo, BasicToastSuccess } from '@shared/components/basic-toast/basic-toast';
import { AppRoutePath } from 'src/app/app.route-path';
import { TipsService } from '@core/services/tips/tips.service';
import { TipsEventsEnum } from '@core/services/tips/tips-events.enum';
import { NextQuoteService } from './services/next-quote.service';
import { IQuote } from '@core/models/quote.model';
import { Clipboard } from '@angular/cdk/clipboard';
import { QuoteHelper } from './helpers/quote.helper';
import { DeviceService } from '@core/services/device.service';

@UntilDestroy()
@Component({
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    QuotesMediator,
    SettingsService,
    BookmarksService,
    NextQuoteService,
    QuotesLoaderService,
    SlideshowService
  ]
})
export class QuotePageComponent implements OnInit {
  @ViewChild('errorMessage', { static: true }) errorMessage!: TemplateRef<any>;
  public readonly isPreviousButtonDisabled$: Observable<boolean>;
  public readonly isNextButtonDisabled$: Observable<boolean>;
  public readonly actionsState$: Observable<ActionsStateType>;
  public readonly inSlideshowMode$: Observable<boolean>;
  public readonly skipHtmlToImageClass = HtmlToImageService.skipHtmlToImageClass;
  public readonly actionsStateEnum = ActionsStateEnum;
  public readonly quotesEventsEnum = QuotesMediatorEvents;
  public readonly appRoutePath = AppRoutePath;
  private readonly _actionsState$ = new BehaviorSubject<ActionsStateType>(ActionsStateEnum.MAIN);
  private readonly _isPreviousButtonDisabled$ = new BehaviorSubject<boolean>(false);
  private readonly _isNextButtonDisabled$ = new BehaviorSubject<boolean>(false);

  constructor(
    public readonly device: DeviceService,
    public readonly platform: Platform,
    public readonly viewport: ViewportService,
    public readonly bookmarksFacade: BookmarksFacade,
    public readonly bookmarksService: BookmarksService,
    public readonly quotesFacade: QuotesFacade,
    public readonly slideshowService: SlideshowService,
    public readonly quotesMediator: QuotesMediator,
    public readonly settingsService: SettingsService,
    private readonly animationProcess: AnimationProcessService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly quotesLoaderService: QuotesLoaderService,
    private readonly htmlToImageService: HtmlToImageService,
    private readonly downloadPhotoService: DownloadPhotoService,
    private readonly toaster: ToasterService,
    private readonly tipsService: TipsService,
    private readonly clipboard: Clipboard
  ) {
    this.quotesMediator.hostComponent = this;

    this.inSlideshowMode$ = slideshowService.state$.pipe(map(state => state === SlidwshowStateEnum.STARTED));
    this.actionsState$ = this._actionsState$.asObservable();
    this.isNextButtonDisabled$ = this._isNextButtonDisabled$.asObservable();
    this.isPreviousButtonDisabled$ = combineLatest([
      quotesFacade.currentPosition$.pipe(map(position => !position)),
      this._isPreviousButtonDisabled$.asObservable()
    ]).pipe(map(([isFirst, isDisabled]) => isFirst || isDisabled));
  }

  public ngOnInit(): void {
    this.tipsService.notify(TipsEventsEnum.QUOTE_PAGE_VISIT);
    this.quotesLoaderService.init();
    this.listenQuoteChanges();
  }

  public animationStart(): void {
    this.animationProcess.animationStart(AnimationNameEnum.QUOTE_CHANGE);
  }

  public animationDone(event: AnimationEvent): void {
    const isNumbers = isNumber(event.fromState) && isNumber(event.toState);

    if (isNumbers) {
      QuotesMediator.notify(
        event.fromState < event.toState
          ? QuotesMediatorEvents.TO_NEXT_QUOTE_FINISH
          : QuotesMediatorEvents.TO_PREVIOUS_QUOTE_FINISH
      );
    }

    this.animationProcess.animationDone(AnimationNameEnum.QUOTE_CHANGE);
  }

  public setNextButtonDisabledState(disabled: boolean): void {
    disabled ? lock(this, this.toNextQuote) : unlock(this, this.toNextQuote);

    this._isNextButtonDisabled$.next(disabled);
  }

  public setPreviousButtonDisabledState(disabled: boolean): void {
    disabled ? lock(this, this.toPreviousQuote) : unlock(this, this.toPreviousQuote);

    this._isPreviousButtonDisabled$.next(disabled);
  }

  @locker()
  @HostListener('document:keyup.arrowright')
  public toNextQuote(): void {
    QuotesMediator.notify(QuotesMediatorEvents.TO_NEXT_QUOTE);
  }

  @locker()
  @HostListener('document:keyup.arrowleft')
  public toPreviousQuote(): void {
    QuotesMediator.notify(QuotesMediatorEvents.TO_PREVIOUS_QUOTE);
  }

  @locker()
  public convertToImage(): void {
    if (this.platform.SAFARI || this.platform.IOS) {
      this.toaster.open(
        new BasicToastInfo(
          {
            title: 'We are sorry :(',
            content:
              'This feature is not available on iOS or Safari according to their security policy.' +
              'We are doing our best to find a way to launch it as soon as possible!' +
              'To try it, use any browser on your computer, except Safari. Or use an Android device.'
          },
          false
        )
      );

      return;
    }

    lock(this, this.convertToImage);
    const imageName = `[Quick Quote] ${this.quotesFacade.selectedQuote?.authorName}`;

    // https://help.unsplash.com/en/articles/2511258-guideline-triggering-a-download
    this.downloadPhotoService.triggerDownload();

    this.htmlToImageService
      .saveImage(imageName)
      .pipe(
        take(1),
        finalize(() => unlock(this, this.convertToImage)),
        untilDestroyed(this)
      )
      .subscribe({
        error: () => this.showError('Snapshot error')
      });
  }

  public onCopyQuote(quote: IQuote): void {
    const quoteToCopy = `${quote.quote}\n${QuoteHelper.getAuthoInfo(quote)}`;

    this.clipboard.copy(quoteToCopy);

    this.toaster.open(
      new BasicToastSuccess({
        title: 'Quote copied!',
        content: 'Feel free to share quotes with friends and family'
      })
    );
  }

  public switchBottomBarState(state: ActionsStateType): void {
    this._actionsState$.next(state);
  }

  public showError(title: string): void {
    this.toaster.open(
      new BasicToastError({
        title,
        content: this.errorMessage
      })
    );
  }

  private listenQuoteChanges(): void {
    this.quotesFacade.selectedQuoteID$
      .pipe(
        filter(Boolean),
        tap(id => this.updateQueryParams(id)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private updateQueryParams(quoteID: string): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { quote: quoteID },
      replaceUrl: true,
      queryParamsHandling: 'merge'
    });
  }
}
