import type { Status } from './Status'

export interface Service {
  readonly name: string
  readonly status: Status
}
