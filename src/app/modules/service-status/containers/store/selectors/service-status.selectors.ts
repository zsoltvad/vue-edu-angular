import { createFeatureSelector } from '@ngrx/store';

import { SERVICE_STATUS_STORE_FEATURE_NAME } from '../../../constants/service-status-store.constants';
import { ServiceStatusState } from '../../../interfaces/service-status-state.interface';

export const selectServiceStatusState =
  createFeatureSelector<ServiceStatusState>(SERVICE_STATUS_STORE_FEATURE_NAME);
