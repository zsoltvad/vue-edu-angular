import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useStatusStore } from './useStatusStore'

const fetchMock = vi.fn()
global.fetch = fetchMock

const createSuccessfulFetchResponse = (data: unknown) => ({
  json: () => new Promise((resolve: (d: unknown) => void) => setTimeout(() => resolve(data), 1000))
})

const createFailedFetchResponse = () => ({
  json: () =>
    new Promise((_: (d: unknown) => void, reject: Function) => setTimeout(() => reject(), 1000))
})

describe('useStatusStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should initially have an empty web request state', () => {
    const store = useStatusStore()
    expect(store.$state).toEqual({
      state: 'empty'
    })
  })

  describe('fetchStatuses', () => {
    describe('with a successful server response', () => {
      beforeEach(() => {
        fetchMock.mockResolvedValue(
          createSuccessfulFetchResponse({
            services: {
              foo: {
                healthStatus: 'UP'
              },
              bar: {
                healthStatus: 'DOWN'
              }
            }
          })
        )
      })

      it('should store the service statuses in the store', async () => {
        const store = useStatusStore()

        store.fetchStatuses()

        expect(store.$state).toEqual({
          state: 'loading'
        })

        await vi.runAllTimersAsync()

        expect(store.$state).toEqual({
          state: 'loaded',
          services: [
            {
              name: 'foo',
              status: 'UP'
            },
            {
              name: 'bar',
              status: 'DOWN'
            }
          ]
        })
      })
    })
  })

  describe('with a failed server response', () => {
    beforeEach(() => {
      fetchMock.mockResolvedValue(createFailedFetchResponse())
    })

    it('should store the service statuses in the store', async () => {
      const store = useStatusStore()

      store.fetchStatuses()

      expect(store.$state).toEqual({
        state: 'loading'
      })

      await vi.runAllTimersAsync()

      expect(store.$state).toEqual({
        state: 'failed'
      })
    })
  })
})
