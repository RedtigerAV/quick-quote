import { AnimationEvent, transition, trigger } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IQuote } from '@core/models/quote.model';
import { Nullable } from '@core/types/nullable.type';
import { toNextQuoteAnimation, toPreviousQuoteAnimation } from './quote-list.animation';
import { QuoteHelper } from '../../helpers/quote.helper';
import { HtmlToImageService } from '@core/services/html-to-image/html-to-image.service';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flyInOut', [
      transition(':increment', toNextQuoteAnimation),
      transition(':decrement', toPreviousQuoteAnimation)
    ])
  ]
})
export class QuoteListComponent implements OnInit {
  @Input() public selectedQuote!: Nullable<IQuote>;
  @Input() public quotes!: Nullable<Array<IQuote>>;
  @Input() public currentPosition!: Nullable<number>;
  @Input() public isSelectedBookmark!: Nullable<boolean>;
  @Output() public likeQuote = new EventEmitter<IQuote>();
  @Output() public dislikeQuote = new EventEmitter<string>();
  @Output() public animationStart = new EventEmitter<AnimationEvent>();
  @Output() public animationDone = new EventEmitter<AnimationEvent>();

  public readonly skipHtmlToImage = HtmlToImageService.skipHtmlToImageClass;

  constructor() {}

  ngOnInit(): void {}

  public getAuthorInfo(quote: IQuote): string {
    return QuoteHelper.getAuthoInfo(quote);
  }
}
