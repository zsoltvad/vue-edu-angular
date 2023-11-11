import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import StatusPage from './StatusPage.vue'

describe('StatusPage', () => {
  it('renders properly', () => {
    const wrapper = mount(StatusPage)
    expect(wrapper.text()).toContain('Status Page')
  })
})
