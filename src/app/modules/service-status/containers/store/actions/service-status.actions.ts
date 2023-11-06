import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { FetchServiceStatusResponse } from '../../../interfaces/fetch-service-status-response.interface';

export const ServiceStatusActions = createActionGroup({
  source: 'ServiceStatus Page',
  events: {
    'Fetch status': emptyProps(),
    'Fetch status success': props<FetchServiceStatusResponse>(),
    'Fetch status error': emptyProps(),
  },
});
