import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuote } from '@core/models/quote.model';
import { IQuoteTopic } from '@core/models/quote-topic.model';

export interface V1QuoteRandomReadRequestParams {
  topicIDs?: Array<string>;
}

@Injectable({ providedIn: 'root' })
export class QuotesApiService {
  private basePath = '/api';

  constructor(private readonly httpClient: HttpClient) {}

  public v1QuoteRandomRead(requestParams?: V1QuoteRandomReadRequestParams): Observable<IQuote> {
    let body = {};

    if (requestParams?.topicIDs && requestParams?.topicIDs?.length) {
      body = { topicIDs: requestParams.topicIDs };
    }

    return this.httpClient.post<IQuote>(`${this.basePath}/v1/quotes/random`, body);
  }

  public v1QuoteByIdRead(id: string): Observable<IQuote> {
    if (!id) {
      throw new Error('Invalid id');
    }

    return this.httpClient.get<IQuote>(`${this.basePath}/v1/quotes/${id}`);
  }

  public v1QuotesInBulk(ids: Array<string>): Observable<Array<IQuote>> {
    if (!ids) {
      throw new Error('Invalid ids');
    }

    return this.httpClient.post<Array<IQuote>>(`${this.basePath}/v1/quotes/`, { ids });
  }

  public v1QuoteTopicsRead(): Observable<Array<IQuoteTopic>> {
    return this.httpClient.get<Array<IQuoteTopic>>(`${this.basePath}/v1/quotes/topics`);
  }
}
