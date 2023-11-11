import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Router } from 'vue-router'

import { STATUS_PATH } from '@/modules/status/constants/route'
import AuthenticationService, {
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_TOKEN_VALUE
} from './AuthenticationService'

const mockPush = vi.fn()
const mockRouter: Router = {
  push: mockPush
} as any

vi.mock('vue-router', () => ({
  useRouter: () => {
    return mockRouter
  }
}))

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService

  beforeEach(() => {
    authenticationService = new AuthenticationService()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('isAuthenticated', () => {
    describe(`with an existing ${LOCAL_STORAGE_TOKEN_KEY} key in the local storage`, () => {
      beforeEach(() => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, 'foo')
      })
      it('should return true', () => {
        const result = authenticationService.isAuthenticated()
        expect(result).toBe(true)
      })
    })

    describe(`without an existing ${LOCAL_STORAGE_TOKEN_KEY} key in the local storage`, () => {
      beforeEach(() => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
      })

      it('should return false', () => {
        const result = authenticationService.isAuthenticated()
        expect(result).toBe(false)
      })
    })
  })

  describe('login', () => {
    beforeEach(() => {
      mockPush.mockClear()
      authenticationService.login()
    })

    it('should store the token in the local storage', () => {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
      expect(token).toBe(LOCAL_STORAGE_TOKEN_VALUE)
    })

    it('should redirect to the status page', () => {
      expect(mockRouter.push).toHaveBeenCalledTimes(1)
      expect(mockRouter.push).toHaveBeenCalledWith(STATUS_PATH)
    })
  })
})
