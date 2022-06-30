import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuote } from '@core/models/quote.model';
import { IQuoteTopic } from '@core/models/quote-topic.model';

export interface V1QuoteRandomReadRequestBody {
  topicIDs?: Array<string>;
}

/**
 * API service for working with quotes
 */
@Injectable({ providedIn: 'root' })
export class QuotesApiService {
  private basePath = '/api';

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Method for getting a random quote
   * @param requestBody Additional conditions for the selection of a quote
   * @returns Random quote that fits the conditions
   */
  public v1QuoteRandomRead(requestBody?: V1QuoteRandomReadRequestBody): Observable<IQuote> {
    let body = {};

    if (requestBody?.topicIDs && requestBody?.topicIDs?.length) {
      body = { topicIDs: requestBody.topicIDs };
    }

    return this.httpClient.post<IQuote>(`${this.basePath}/v1/quotes/random`, body);
  }

  /**
   * Method for getting a quote by ID
   * @param id ID of quote
   * @returns Searched quote
   */
  public v1QuoteByIdRead(id: string): Observable<IQuote> {
    if (!id) {
      throw new Error('Invalid id');
    }

    return this.httpClient.get<IQuote>(`${this.basePath}/v1/quotes/${id}`);
  }

  /**
   * Bulk-request to get an array of quotes by their id
   * @param ids desired quote IDs
   * @returns An array of searched quotes
   */
  public v1QuotesInBulk(ids: Array<string>): Observable<Array<IQuote>> {
    if (!ids) {
      throw new Error('Invalid ids');
    }

    return this.httpClient.post<Array<IQuote>>(`${this.basePath}/v1/quotes/`, { ids });
  }

  /**
   * Method for getting an array of quote topics
   * @returns Array of quote topics
   */
  public v1QuoteTopicsRead(): Observable<Array<IQuoteTopic>> {
    return this.httpClient.get<Array<IQuoteTopic>>(`${this.basePath}/v1/quotes/topics`);
  }
}
