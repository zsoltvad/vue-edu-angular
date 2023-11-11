import type { Service } from './Service'

export interface EmptyStatusWebRequestState {
  readonly state: 'empty'
}

export interface LoadingStatusWebRequestState {
  readonly state: 'loading'
}

export interface FailedStatusWebRequestState {
  readonly state: 'failed'
}

export interface LoadedStatusWebRequestState {
  readonly state: 'loaded'
  readonly services: readonly Service[]
}

export type StatusWebRequestState =
  | EmptyStatusWebRequestState
  | LoadingStatusWebRequestState
  | FailedStatusWebRequestState
  | LoadedStatusWebRequestState
