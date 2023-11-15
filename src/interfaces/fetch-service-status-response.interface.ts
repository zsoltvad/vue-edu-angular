import type { ServiceStatusType } from '@/types/service-status-item.type'
import type { ServiceStatusItem } from './service-status-item.interface'

export interface FetchServiceStatusResponse {
  readonly services: Record<ServiceStatusType, ServiceStatusItem>
}
