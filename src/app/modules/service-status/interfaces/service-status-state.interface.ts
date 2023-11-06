import { ServiceStatusType } from '../types/service-status-item.type';
import { ServiceStatusItem } from './service-status-item.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServiceStatusEmptyState {}

export interface ServiceStatusLoadingState {
  readonly isLoading: boolean;
}

export interface ServiceStatusFetchedState {
  readonly services: Record<ServiceStatusType, ServiceStatusItem>;
}

export type ServiceStatusState =
  | ServiceStatusEmptyState
  | ServiceStatusLoadingState
  | ServiceStatusFetchedState;
