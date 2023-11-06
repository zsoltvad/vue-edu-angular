import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ServiceStatusService } from '../../../services/service-status.service';
import { FetchServiceStatusResponse } from '../../../interfaces/fetch-service-status-response.interface';
import { ServiceStatusActions } from '../actions/service-status.actions';

@Injectable()
export class ServiceStatusEffects {
  fetchServiceStatuses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceStatusActions.fetchStatus),
      switchMap(() =>
        this.serviceStatusService.fetchServiceStatus$().pipe(
          map((fetchServiceStatusResponse: FetchServiceStatusResponse) =>
            ServiceStatusActions.fetchStatusSuccess(fetchServiceStatusResponse)
          ),
          catchError(() => of(ServiceStatusActions.fetchStatusError()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private serviceStatusService: ServiceStatusService
  ) {}
}
