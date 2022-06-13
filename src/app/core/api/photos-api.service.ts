import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPhoto } from '@core/models/photo.model';

export interface V1PhotosReadRequestParams {
  /**
   * @default landscape
   */
  orientation?: 'landscape' | 'portrait' | 'squarish';
}

export interface V1PhotosDownloadRequestParams {
  download_location: string;
}

@Injectable({ providedIn: 'root' })
export class PhotosApiService {
  private basePath = `${environment.serverUrl}/api`;

  constructor(private httpClient: HttpClient) {}

  public v1PhotosRandomRead(requestParams?: V1PhotosReadRequestParams): Observable<Array<IPhoto>> {
    let params = new HttpParams();
    const orientation = requestParams?.orientation || 'landscape';

    if (orientation) {
      params = params.set('orientation', orientation);
    }

    return this.httpClient.get<Array<IPhoto>>(`${this.basePath}/v1/photos/random`, { params });
  }

  public v1PhotosDownload({ download_location }: V1PhotosDownloadRequestParams): Observable<void> {
    return this.httpClient.post<void>(`${this.basePath}/v1/photos/download`, { download_location });
  }
}
