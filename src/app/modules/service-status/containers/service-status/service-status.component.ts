import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ServiceStatusActions } from '../store/actions/service-status.actions';
import { selectServiceStatusState } from '../store/selectors/service-status.selectors';
import { isResultState } from '../../typeguards/is-result-state.typeguard';
import { isLoadingState } from '../../typeguards/is-loading-state.typeguard';

@Component({
  selector: 'app-service-status',
  templateUrl: './service-status.component.html',
})
export class ServiceStatusComponent implements OnInit {
  readonly serviceStatusState$ = this.store.select(selectServiceStatusState);

  readonly isResultState = isResultState;
  readonly isLoadingState = isLoadingState;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ServiceStatusActions.fetchStatus());
  }
}
