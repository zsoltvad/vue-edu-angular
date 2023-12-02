import { defineStore } from 'pinia'
import type { Status } from '../interfaces/status'
import type { WebRequestState } from '../interfaces/request'
import type { Service } from '../interfaces/service'

type ServiceStatus = { readonly healthStatus: Status }

const API_URL =
  'https://dsp-health-upscale-api-upscale.azure-api.net/api/v0/system-status/health'

export const useStatusStore = defineStore({
  id: 'status',
  state: (): WebRequestState => ({
    state: 'notAsked'
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
          state: 'result',
          services: Object.entries<ServiceStatus>(responseBody.services).map(
            ([name, service]: [string, ServiceStatus]): Service => ({
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
