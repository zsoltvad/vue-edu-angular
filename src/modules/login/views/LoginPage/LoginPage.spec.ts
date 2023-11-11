import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import LoginPage from './LoginPage.vue'

describe('LoginPage', () => {
  it('renders properly', () => {
    const wrapper = mount(LoginPage)
    expect(wrapper.text()).toContain('Login Page')
  })
})
