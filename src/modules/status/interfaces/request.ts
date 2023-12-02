import type { Service } from './service'

export interface NotAskedRequestState {
  readonly state: 'notAsked'
}

export interface LoadingRequestState {
  readonly state: 'loading'
}

export interface FailedRequestState {
  readonly state: 'failed'
}

export interface ResultRequestState {
  readonly state: 'result'
  readonly services: readonly Service[]
}

export type WebRequestState =
  | NotAskedRequestState
  | LoadingRequestState
  | FailedRequestState
  | ResultRequestState