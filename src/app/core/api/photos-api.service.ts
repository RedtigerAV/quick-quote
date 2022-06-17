import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPhoto } from '@core/models/photo.model';
import { IPhotoTopic } from '@core/models/photo-topic.model';

export interface V1PhotosReadRequestParams {
  /**
   * @default landscape
   */
  orientation?: 'landscape' | 'portrait' | 'squarish';
  topics?: Array<string>;
}

export interface V1PhotosDownloadRequestParams {
  download_location: string;
}

@Injectable({ providedIn: 'root' })
export class PhotosApiService {
  private basePath = '/api';

  constructor(private httpClient: HttpClient) {}

  public v1PhotosRandomRead(requestParams?: V1PhotosReadRequestParams): Observable<Array<IPhoto>> {
    const orientation = requestParams?.orientation || 'landscape';
    const topics = requestParams?.topics || [];
    const body = { orientation, topics };

    return this.httpClient.post<Array<IPhoto>>(`${this.basePath}/v1/photos/random`, body);
  }

  public v1PhotosDownload({ download_location }: V1PhotosDownloadRequestParams): Observable<void> {
    return this.httpClient.post<void>(`${this.basePath}/v1/photos/download`, { download_location });
  }

  public v1PhotoTopicsRead(): Observable<Array<IPhotoTopic>> {
    return this.httpClient.get<Array<IPhotoTopic>>(`${this.basePath}/v1/photos/topics`);
  }
}
