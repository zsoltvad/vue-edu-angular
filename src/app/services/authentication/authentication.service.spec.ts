import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { createSpyFromClass, Spy } from 'jest-auto-spies';

import { AuthenticationService } from './authentication.service';
import { LS_TOKEN_KEY, LS_TOKEN_VALUE } from '../../constants/storage';
import { STATUS_PATH } from '../../constants/routes';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let router: Spy<Router>;

  beforeEach(() => {
    router = createSpyFromClass(Router);

    TestBed.configureTestingModule({
      providers: [AuthenticationService, { provide: Router, useValue: router }],
    });

    service = TestBed.inject(AuthenticationService);
  });

  describe(`'s isAuthenticated`, () => {
    describe('when token exists in local storage', () => {
      beforeEach(() => {
        localStorage.setItem(LS_TOKEN_KEY, '123');
      });

      it(`should return 'true'`, () => {
        expect(service.isAuthenticated()).toEqual(true);
      });
    });

    describe('when token does not exists in local storage', () => {
      beforeEach(() => {
        localStorage.clear();
      });

      it(`should return 'false'`, () => {
        expect(service.isAuthenticated()).toEqual(false);
      });
    });
  });

  describe(`'s login`, () => {
    beforeEach(() => {
      service.login();
    });

    it(`should set token in local storage`, () => {
      expect(localStorage.getItem(LS_TOKEN_KEY)).toEqual(LS_TOKEN_VALUE);
    });

    it(`should navigate to '/${STATUS_PATH}'`, () => {
      expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith(STATUS_PATH);
    });
  });
});
