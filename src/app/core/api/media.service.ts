import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMedia } from '@core/models/media.model';

@Injectable({ providedIn: 'root' })
export class MediaService {
  private basePath = `${environment.serverUrl}/api`;

  constructor(private httpClient: HttpClient) {}

  public v1MediaRead(): Observable<IMedia> {
    return this.httpClient.get<IMedia>(`${this.basePath}/v1/media`);
  }
}
