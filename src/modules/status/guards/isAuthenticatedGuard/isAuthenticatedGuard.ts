import { inject } from 'vue'

import { LOGIN_PATH } from '@/modules/login/constants/route'
import AuthenticationService from '@/services/AuthenticationService/AuthenticationService'

export const isAuthenticatedGuard = () => {
  const authenticationService = inject<AuthenticationService>(AuthenticationService.SERVICE_NAME)!

  if (authenticationService.isAuthenticated()) {
    return true
  }

  return {
    path: LOGIN_PATH
  }
}
