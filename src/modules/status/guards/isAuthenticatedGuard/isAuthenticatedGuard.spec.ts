import { beforeEach, describe, expect, it, vi } from 'vitest'

import { LOGIN_PATH } from '@/modules/login/constants/route'
import AuthenticationService from '@/services/AuthenticationService/AuthenticationService'
import { isAuthenticatedGuard } from './isAuthenticatedGuard'

let isAuthenticated = false

vi.mock('vue', () => ({
  inject: (key: string) => {
    expect(key).toBe(AuthenticationService.SERVICE_NAME)
    return {
      isAuthenticated: () => isAuthenticated
    }
  }
}))

describe('isAuthenticatedGuard', () => {
  describe('with an unauthenticated user', () => {
    beforeEach(() => {
      isAuthenticated = false
    })

    it('should redirect to the login page', () => {
      const result = isAuthenticatedGuard()
      expect(result).toStrictEqual({
        path: LOGIN_PATH
      })
    })
  })

  describe('with an authenticated user', () => {
    beforeEach(() => {
      isAuthenticated = true
    })

    it('should return true', () => {
      const result = isAuthenticatedGuard()
      expect(result).toBe(true)
    })
  })
})
