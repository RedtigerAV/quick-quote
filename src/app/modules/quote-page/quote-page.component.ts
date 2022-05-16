import { Component, OnInit } from '@angular/core';
import { QuotesFacade } from '@core/redux/quotes/quotes.facade';

@Component({
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.scss']
})
export class QuotePageComponent implements OnInit {
  constructor(public readonly quotesFacade: QuotesFacade) {}

  public ngOnInit(): void {}
}
