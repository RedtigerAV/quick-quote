import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuote } from '@core/models/quote.model';

@Injectable({ providedIn: 'root' })
export class QuotesApiService {
  private basePath = `${environment.serverUrl}/api`;

  constructor(private readonly httpClient: HttpClient) {}

  public v1QuoteRandomRead(): Observable<IQuote> {
    return this.httpClient.get<IQuote>(`${this.basePath}/v1/quote/random`);
  }

  public v1QuoteByIdRead(id: string): Observable<IQuote> {
    return this.httpClient.get<IQuote>(`${this.basePath}/v1/quote/${id}`);
  }
}
