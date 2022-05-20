import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IQuote } from '@core/models/quote.model';
import { Nullable } from '@core/types/nullable.type';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteListComponent implements OnInit {
  @Input() public selectedQuote!: Nullable<IQuote>;
  @Input() public quotes!: Nullable<Array<IQuote>>;

  constructor() {}

  ngOnInit(): void {}

  public getAuthorInfo({ authorName, authorNationality, authorProfession }: IQuote): string {
    if (authorName && authorNationality && authorProfession) {
      return `${authorName}, ${authorNationality} ${authorProfession}`;
    } else if (authorName && authorProfession) {
      return `${authorName}, ${authorProfession}`;
    }

    return authorName;
  }
}
