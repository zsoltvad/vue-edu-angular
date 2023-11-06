import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { createSpyFromClass, Spy } from 'jest-auto-spies';

import { isNotAuthenticatedGuard } from './is-not.authenticated.guard';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { STATUS_PATH } from '../../constants/routes';

describe('isNotAuthenticatedGuard', () => {
  let isAuthenticated: boolean;
  let authenticationService: Spy<AuthenticationService>;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let routerStateSnapshot: RouterStateSnapshot;
  let router: Router;

  const executeGuard = () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: authenticationService },
        { provide: Router, useValue: router },
      ],
    });

    return TestBed.runInInjectionContext(() =>
      isNotAuthenticatedGuard(activatedRouteSnapshot, routerStateSnapshot)
    );
  };

  beforeEach(() => {
    activatedRouteSnapshot = createSpyFromClass(ActivatedRouteSnapshot);
    routerStateSnapshot = createSpyFromClass(RouterStateSnapshot);
    router = createSpyFromClass(Router);
  });

  describe('when user is authenticated', () => {
    beforeEach(() => {
      isAuthenticated = true;

      authenticationService = createSpyFromClass(AuthenticationService);
      authenticationService.isAuthenticated.mockReturnValue(isAuthenticated);
    });

    it(`should navigate to '${STATUS_PATH}'`, () => {
      executeGuard();
      expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith(STATUS_PATH);
    });

    it(`should return 'false'`, () => {
      expect(executeGuard()).toEqual(!isAuthenticated);
    });
  });

  describe('when user is not authenticated', () => {
    beforeEach(() => {
      isAuthenticated = false;

      authenticationService = createSpyFromClass(AuthenticationService);
      authenticationService.isAuthenticated.mockReturnValue(isAuthenticated);
    });

    it(`should return 'true'`, () => {
      expect(executeGuard()).toEqual(!isAuthenticated);
    });
  });
});
