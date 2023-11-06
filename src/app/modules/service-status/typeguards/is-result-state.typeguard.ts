import {
  ServiceStatusFetchedState,
  ServiceStatusState,
} from '../interfaces/service-status-state.interface';

export const isResultState = (
  state: ServiceStatusState
): state is ServiceStatusFetchedState => 'services' in state;
