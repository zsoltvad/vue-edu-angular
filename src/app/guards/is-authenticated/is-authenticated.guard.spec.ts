import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { createSpyFromClass, Spy } from 'jest-auto-spies';

import { isAuthenticatedGuard } from './is-authenticated.guard';
import { AuthenticationService } from '../../services/authentication/authentication.service';

describe('isAuthenticatedGuard', () => {
  let isAuthenticated: boolean;
  let authenticationService: Spy<AuthenticationService>;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let routerStateSnapshot: RouterStateSnapshot;

  const executeGuard = () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: authenticationService },
      ],
    });

    return TestBed.runInInjectionContext(() =>
      isAuthenticatedGuard(activatedRouteSnapshot, routerStateSnapshot)
    );
  };

  beforeEach(() => {
    activatedRouteSnapshot = createSpyFromClass(ActivatedRouteSnapshot);
    routerStateSnapshot = createSpyFromClass(RouterStateSnapshot);
  });

  describe('when user is authenticated', () => {
    beforeEach(() => {
      isAuthenticated = true;

      authenticationService = createSpyFromClass(AuthenticationService);
      authenticationService.isAuthenticated.mockReturnValue(isAuthenticated);
    });

    it(`should return 'true'`, () => {
      expect(executeGuard()).toEqual(isAuthenticated);
    });
  });

  describe('when user is not authenticated', () => {
    beforeEach(() => {
      isAuthenticated = false;

      authenticationService = createSpyFromClass(AuthenticationService);
      authenticationService.isAuthenticated.mockReturnValue(isAuthenticated);
    });

    it(`should return 'false'`, () => {
      expect(executeGuard()).toEqual(isAuthenticated);
    });
  });
});
