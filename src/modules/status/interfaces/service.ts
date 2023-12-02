import type { Status } from './status'

export interface Service {
  readonly name: string
  readonly status: Status
}