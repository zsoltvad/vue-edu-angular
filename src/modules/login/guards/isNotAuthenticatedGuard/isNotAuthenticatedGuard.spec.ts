import { beforeEach, describe, expect, it, vi } from 'vitest'

import { STATUS_PATH } from '@/modules/status/constants/route'
import AuthenticationService from '@/services/AuthenticationService/AuthenticationService'
import { isNotAuthenticatedGuard } from './isNotAuthenticatedGuard'

let isAuthenticated = false

vi.mock('vue', (originalVue: any) => {
  return {
    ...originalVue,
    inject: (key: string) => {
      expect(key).toBe(AuthenticationService.SERVICE_NAME)
      return {
        isAuthenticated: () => isAuthenticated
      }
    }
  }
})

describe('isNotAuthenticatedGuard', () => {
  describe('with an unauthenticated user', () => {
    beforeEach(() => {
      isAuthenticated = false
    })

    it('should return true', () => {
      const result = isNotAuthenticatedGuard()
      expect(result).toBe(true)
    })
  })

  describe('with an authenticated user', () => {
    beforeEach(() => {
      isAuthenticated = true
    })

    it('should redirect to the status page', () => {
      const result = isNotAuthenticatedGuard()
      expect(result).toStrictEqual({
        path: STATUS_PATH
      })
    })
  })
})
