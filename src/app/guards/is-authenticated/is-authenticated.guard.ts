import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LOGIN_PATH } from '../../constants/routes';

export const isAuthenticatedGuard: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.isAuthenticated()) {
    return true;
  }

  router.navigateByUrl(LOGIN_PATH);
  return false;
};
