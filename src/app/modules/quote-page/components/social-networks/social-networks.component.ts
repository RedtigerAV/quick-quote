import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { IQuote } from '@core/models/quote.model';
import { Nullable } from '@core/types/nullable.type';
import { QuoteHelper } from '../../helpers/quote.helper';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialNetworksComponent implements OnChanges {
  @Input() public opened!: Nullable<boolean>;
  @Input() public quote!: Nullable<IQuote>;
  @Output() public collapse = new EventEmitter<void>();

  public description!: string;
  public tags = 'QuickQuote';

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    const quote: IQuote = changes['quote']?.currentValue;

    if (quote) {
      this.description = `"${quote.quote}"\n${QuoteHelper.getAuthoInfo(quote)}\n`;
    }
  }
}
