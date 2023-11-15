import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ServiceStatusState } from '@/interfaces/service-status-state.interface'
import type { FetchServiceStatusResponse } from '@/interfaces/fetch-service-status-response.interface'
import axios from 'axios'
import { API_URL } from '@/constants/api'

export const useServiceStatusStoreStore = defineStore('serviceStatus', () => {
  const state = ref<ServiceStatusState>({ status: 'notAsked' })

  const fetchStatus = async () => {
    state.value = {
      status: 'loading'
    }

    try {
      const { data } = await axios.get(API_URL)

      fetchStatusSuccess(data)
    } catch (error) {
      fetchStatusError()
    }
  }

  const fetchStatusSuccess = ({ services }: FetchServiceStatusResponse) => {
    state.value = { status: 'result', services }
  }

  const fetchStatusError = () => {
    state.value = { status: 'error' }
  }

  return { state, fetchStatus, fetchStatusError, fetchStatusSuccess }
})
