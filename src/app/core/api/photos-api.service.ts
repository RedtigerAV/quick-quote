import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPhoto } from '@core/models/photo.model';
import { IPhotoTopic } from '@core/models/photo-topic.model';

export interface V1PhotosReadRequestBody {
  /**
   * @default landscape
   */
  orientation?: 'landscape' | 'portrait' | 'squarish';
  topics?: Array<string>;
}

export interface V1PhotosDownloadRequestBody {
  download_location: string;
}

@Injectable({ providedIn: 'root' })
export class PhotosApiService {
  private basePath = '/api';

  constructor(private httpClient: HttpClient) {}

  public v1PhotosRandomRead(requestBody?: V1PhotosReadRequestBody): Observable<Array<IPhoto>> {
    const orientation = requestBody?.orientation || 'landscape';
    const topics = requestBody?.topics || [];
    const body = { orientation, topics };

    return this.httpClient.post<Array<IPhoto>>(`${this.basePath}/v1/photos/random`, body);
  }

  public v1PhotosDownload({ download_location }: V1PhotosDownloadRequestBody): Observable<void> {
    return this.httpClient.post<void>(`${this.basePath}/v1/photos/download`, { download_location });
  }

  public v1PhotoTopicsRead(): Observable<Array<IPhotoTopic>> {
    return this.httpClient.get<Array<IPhotoTopic>>(`${this.basePath}/v1/photos/topics`);
  }
}
