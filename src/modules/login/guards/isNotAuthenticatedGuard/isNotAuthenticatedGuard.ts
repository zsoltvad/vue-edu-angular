import { inject } from 'vue'

import { STATUS_PATH } from '@/modules/status/constants/route'
import AuthenticationService from '@/services/AuthenticationService/AuthenticationService'

export const isNotAuthenticatedGuard = () => {
  const authenticationService = inject<AuthenticationService>(AuthenticationService.SERVICE_NAME)!

  if (authenticationService.isAuthenticated()) {
    return {
      path: STATUS_PATH
    }
  }

  return true
}
