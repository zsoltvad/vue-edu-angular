import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ServiceStatusService } from './service-status.service';
import { API_URL } from '../../../constants/api';

describe('ServiceStatusService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let service: ServiceStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceStatusService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ServiceStatusService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe(`'s fetchServiceStatus$`, () => {
    it(`should call the API url: ${API_URL}`, () => {
      service.fetchServiceStatus$().subscribe();
      expect(httpMock.expectOne(API_URL));
    });
  });
});
