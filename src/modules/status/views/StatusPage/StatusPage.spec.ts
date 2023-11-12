import { createTestingPinia } from '@pinia/testing'
import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createMetaManager } from 'vue-meta'

import StatusPage from './StatusPage.vue'
import { useStatusStore } from '../../store/useStatusStore'

describe('StatusPage', () => {
  let wrapper: VueWrapper

  describe('during initialization', () => {
    beforeEach(() => {
      wrapper = mount(StatusPage, {
        global: {
          plugins: [
            createMetaManager(),
            createTestingPinia({
              createSpy: vi.fn
            })
          ]
        }
      })
    })

    it('should fetch the statuses', () => {
      const store = useStatusStore()
      expect(store.fetchStatuses).toHaveBeenCalledTimes(1)
      expect(store.fetchStatuses).toHaveBeenCalledWith()
    })
  })

  describe('in loading state', () => {
    beforeEach(() => {
      wrapper = mount(StatusPage, {
        global: {
          plugins: [
            createMetaManager(),
            createTestingPinia({
              createSpy: vi.fn,
              initialState: {
                status: {
                  state: 'loading'
                }
              }
            })
          ]
        }
      })
    })

    it('render the loader', () => {
      expect(wrapper.find('svg').exists()).toBe(true)
    })
  })

  describe('in failed state', () => {
    beforeEach(() => {
      wrapper = mount(StatusPage, {
        global: {
          plugins: [
            createMetaManager(),
            createTestingPinia({
              createSpy: vi.fn,
              initialState: {
                status: {
                  state: 'failed'
                }
              }
            })
          ]
        }
      })
    })

    it('render the error message', () => {
      const errorMessage = wrapper.find('p')
      expect(errorMessage.text()).toBe('The service statuses could not be loaded.')
    })
  })

  describe('in loaded state', () => {
    beforeEach(() => {
      wrapper = mount(StatusPage, {
        global: {
          plugins: [
            createMetaManager(),
            createTestingPinia({
              createSpy: vi.fn,
              initialState: {
                status: {
                  state: 'loaded',
                  services: [
                    {
                      name: 'foo',
                      status: 'UP'
                    },
                    {
                      name: 'bar',
                      status: 'BAR'
                    }
                  ]
                }
              }
            })
          ]
        }
      })
    })

    it('render the table', () => {
      const serviceNames = wrapper
        .findAll('[data-id="service-name"]')
        .map((el: DOMWrapper<Element>) => el.text())
      expect(serviceNames).toEqual(['foo', 'bar'])

      const serviceStatuses = wrapper
        .findAll('[data-id="service-status"]')
        .map((el: DOMWrapper<Element>) => el.text())
      expect(serviceStatuses).toEqual(['✅', '❌'])
    })
  })
})
