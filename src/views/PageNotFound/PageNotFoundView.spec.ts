import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import PageNotFoundPage from './PageNotFoundView.vue'

describe('PageNotFoundPage', () => {
  it('should display the subtitle', () => {
    const wrapper = mount(PageNotFoundPage)
    expect(wrapper.find('h2').text()).toContain('404')
  })
})
