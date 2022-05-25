import { transition, trigger } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IQuote } from '@core/models/quote.model';
import { Nullable } from '@core/types/nullable.type';
import { toNextQuoteAnimation, toPreviousQuoteAnimation } from './quote-list.animation';
import { QuoteHelper } from '../../helpers/quote.helper';

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

  constructor() {}

  ngOnInit(): void {}

  public getAuthorInfo(quote: IQuote): string {
    return QuoteHelper.getAuthoInfo(quote);
  }
}
