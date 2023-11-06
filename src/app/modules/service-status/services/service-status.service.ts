import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FetchServiceStatusResponse } from '../interfaces/fetch-service-status-response.interface';
import { API_URL } from '../../../constants/api';

@Injectable({
  providedIn: 'root',
})
export class ServiceStatusService {
  constructor(private readonly httpClient: HttpClient) {}

  fetchServiceStatus$(): Observable<FetchServiceStatusResponse> {
    return this.httpClient.get<FetchServiceStatusResponse>(API_URL, {
      responseType: 'json',
      headers: new HttpHeaders(),
      observe: 'body',
      reportProgress: false,
    });
  }
}
