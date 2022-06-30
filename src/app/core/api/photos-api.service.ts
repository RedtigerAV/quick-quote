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
  ixid: string;
}

/**
 * API service for photos
 */
@Injectable({ providedIn: 'root' })
export class PhotosApiService {
  private basePath = '/api';

  constructor(private httpClient: HttpClient) {}

  /**
   * Method for getting an array of random images
   * @param requestBody Additional conditions for the selection of images
   * @returns Array of images that match the conditions
   */
  public v1PhotosRandomRead(requestBody?: V1PhotosReadRequestBody): Observable<Array<IPhoto>> {
    const orientation = requestBody?.orientation || 'landscape';
    const topics = requestBody?.topics || [];
    const body = { orientation, topics };

    return this.httpClient.post<Array<IPhoto>>(`${this.basePath}/v1/photos/random`, body);
  }

  /**
   * Method for triggering download of image
   * A prerequisite for working with unsplash
   * @see https://help.unsplash.com/en/articles/2511258-guideline-triggering-a-download
   * @param id ID of unsplash image
   * @param param1 IXID parameter of unsplash image
   * @returns void
   */
  public v1PhotosDownload(id: string, { ixid }: V1PhotosDownloadRequestBody): Observable<void> {
    return this.httpClient.post<void>(`${this.basePath}/v1/photos/${id}/download`, { ixid });
  }

  /**
   * Method for getting an array of unsplash topics
   * @returns Array of unsplash topics
   */
  public v1PhotoTopicsRead(): Observable<Array<IPhotoTopic>> {
    return this.httpClient.get<Array<IPhotoTopic>>(`${this.basePath}/v1/photos/topics`);
  }
}
