import { IQuote } from '@core/models/quote.model';
import { Observable, filter } from 'rxjs';
import { QuoteService } from '@core/services/quote.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.scss']
})
export class QuotePageComponent implements OnInit {
  public readonly quote$: Observable<IQuote>;

  constructor(quoteService: QuoteService) {
    this.quote$ = quoteService.quote$.pipe(filter(Boolean));
  }

  public ngOnInit(): void {}
}
