import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import PageNotFoundPage from './PageNotFoundView.vue'

describe('PageNotFoundPage', () => {
  it('renders properly', () => {
    const wrapper = mount(PageNotFoundPage)
    expect(wrapper.text()).toContain('Page Not Found')
  })
})
