import type { ServiceStatusType } from '@/types/service-status-item.type'
import type { ServiceStatusItem } from './service-status-item.interface'

export interface ServiceStatusEmptyState {
  readonly status: 'notAsked'
}

export interface ServiceStatusLoadingState {
  readonly status: 'loading'
}

export interface ServiceStatusFetchedState {
  readonly status: 'result'
  readonly services: Record<ServiceStatusType, ServiceStatusItem>
}

export interface ServiceStatusErrorState {
  readonly status: 'error'
}

export type ServiceStatusState =
  | ServiceStatusEmptyState
  | ServiceStatusLoadingState
  | ServiceStatusFetchedState
  | ServiceStatusErrorState
