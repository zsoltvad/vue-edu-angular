import { createReducer, on } from '@ngrx/store';

import { ServiceStatusState } from '../../../interfaces/service-status-state.interface';
import { ServiceStatusActions } from '../actions/service-status.actions';
import { FetchServiceStatusResponse } from '../../../interfaces/fetch-service-status-response.interface';

export const initialState: ServiceStatusState = {};

export const serviceStatusReducer = createReducer(
  initialState,

  on(ServiceStatusActions.fetchStatus, () => ({
    isLoading: true,
  })),

  on(
    ServiceStatusActions.fetchStatusSuccess,
    (_: ServiceStatusState, { services }: FetchServiceStatusResponse) => ({
      services,
    })
  ),

  on(ServiceStatusActions.fetchStatusError, () => ({}))
);
