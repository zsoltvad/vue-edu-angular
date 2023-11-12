import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, it, expect, vi, type Mock } from 'vitest'
import { createMetaManager } from 'vue-meta'

import AuthenticationService from '@/services/AuthenticationService/AuthenticationService'
import LoginPage from './LoginPage.vue'

describe('LoginPage', () => {
  let wrapper: VueWrapper
  let loginMock: Mock

  beforeEach(() => {
    loginMock = vi.fn()

    wrapper = mount(LoginPage, {
      global: {
        plugins: [createMetaManager()],
        provide: {
          [AuthenticationService.SERVICE_NAME]: {
            login: loginMock
          }
        }
      }
    })
  })

  it('should not display any errors initially', () => {
    const emailErrorMessage = wrapper.find('[data-id="email-error-message"]')
    expect(emailErrorMessage.exists()).toBe(false)

    const passwordErrorMessage = wrapper.find('[data-id="password-error-message"]')
    expect(passwordErrorMessage.exists()).toBe(false)
  })

  describe('after the submit button is clicked', () => {
    beforeEach(async () => {
      await wrapper.find('form').trigger('submit')
    })

    it('should display the required errors', () => {
      const emailErrorMessage = wrapper.find('[data-id="email-error-message"]')
      expect(emailErrorMessage.text()).toBe('Please enter your e-mail address')

      const passwordErrorMessage = wrapper.find('[data-id="password-error-message"]')
      expect(passwordErrorMessage.text()).toBe('Please enter your password')
    })

    it('should not invoke the AuthenticationService.login method', () => {
      expect(loginMock).not.toHaveBeenCalled()
    })
  })

  describe('after an invalid e-mail address is entered', () => {
    beforeEach(async () => {
      await wrapper.find('input[type="email"]').setValue('foo')
      await wrapper.find('input[type="email"]').trigger('blur')
    })

    it('should display the invalid e-mail address error', () => {
      const emailErrorMessage = wrapper.find('[data-id="email-error-message"]')
      expect(emailErrorMessage.text()).toBe('Please enter a valid e-mail address')
    })
  })

  describe('after a valid e-mail address and a password is entered', () => {
    beforeEach(async () => {
      await wrapper.find('input[type="email"]').setValue('foo@bar.com')
      await wrapper.find('input[type="password"]').setValue('apple1234')
      await wrapper.find('input[type="password"]').trigger('blur')
    })

    it('should not display any errors', () => {
      const emailErrorMessage = wrapper.find('[data-id="email-error-message"]')
      expect(emailErrorMessage.exists()).toBe(false)

      const passwordErrorMessage = wrapper.find('[data-id="password-error-message"]')
      expect(passwordErrorMessage.exists()).toBe(false)
    })

    describe('after the submit button is clicked', () => {
      beforeEach(async () => {
        await wrapper.find('form').trigger('submit')
      })

      it('should invoke the AuthenticationService.login method', () => {
        expect(loginMock).toHaveBeenCalledTimes(1)
        expect(loginMock).toHaveBeenCalledWith()
      })
    })
  })
})
