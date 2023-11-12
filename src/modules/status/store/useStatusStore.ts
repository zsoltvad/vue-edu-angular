import { defineStore } from 'pinia'

import { API_URL } from '../constants/api'
import type { StatusWebRequestState } from '../interfaces/StatusWebRequestState'
import type { Status } from '../interfaces/Status'
import type { Service } from '../interfaces/Service'

type BackendStatus = { readonly healthStatus: Status }

export const useStatusStore = defineStore({
  id: 'status',
  state: (): StatusWebRequestState => ({
    state: 'empty'
  }),
  actions: {
    async fetchStatuses() {
      this.$patch({
        state: 'loading'
      })

      try {
        const response = await fetch(API_URL)
        const responseBody = await response.json()
        this.$patch({
          state: 'loaded',
          services: Object.entries<BackendStatus>(responseBody.services).map(
            ([name, service]: [string, BackendStatus]): Service => ({
              name,
              status: service.healthStatus
            })
          )
        })
      } catch (error) {
        this.$patch({
          state: 'failed'
        })
      }
    }
  }
})
