import type { Router } from 'vue-router'

import { STATUS_PATH } from '@/modules/status/constants/route'

export const LOCAL_STORAGE_TOKEN_KEY = 'TOKEN'
export const LOCAL_STORAGE_TOKEN_VALUE = '123'

export default class AuthenticationService {
  static readonly SERVICE_NAME = 'AuthenticationService'

  constructor(private readonly router: Router) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
  }

  login(): void {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_TOKEN_VALUE)
    this.router.push(STATUS_PATH)
  }
}
