import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMedia } from '@core/models/media.model';

export interface V1MediaReadRequestParams {
  /**
   * @default landscape
   */
  orientation?: 'landscape' | 'portrait' | 'squarish';
}

@Injectable({ providedIn: 'root' })
export class MediaApiService {
  private basePath = `${environment.serverUrl}/api`;

  constructor(private httpClient: HttpClient) {}

  public v1MediaRead(requestParams?: V1MediaReadRequestParams): Observable<Array<IMedia>> {
    let params = new HttpParams();
    const orientation = requestParams?.orientation || 'landscape';

    if (orientation) {
      params = params.set('orientation', orientation);
    }

    return this.httpClient.get<Array<IMedia>>(`${this.basePath}/v1/media`, { params });
  }
}
