import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { STATUS_PATH } from '../../constants/routes';

export const isNotAuthenticatedGuard: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.isAuthenticated()) {
    router.navigateByUrl(STATUS_PATH);
    return false;
  }

  return true;
};
