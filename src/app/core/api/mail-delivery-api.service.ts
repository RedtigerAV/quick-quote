import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface V1SendMailBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * API service for sending mail
 */
@Injectable({ providedIn: 'root' })
export class MailDeliveryApiService {
  private basePath = '/api';

  constructor(private httpClient: HttpClient) {}

  public v1SendMail(requestBody?: V1SendMailBody): Observable<void> {
    return this.httpClient.post<void>(`${this.basePath}/v1/mail-delivery/send`, requestBody);
  }
}
