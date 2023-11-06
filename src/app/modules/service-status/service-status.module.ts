import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceStatusComponent } from './containers/service-status/service-status.component';
import { EffectsModule } from '@ngrx/effects';
import { ServiceStatusEffects } from './containers/store/effects/service-status.effects';
import { StoreModule } from '@ngrx/store';
import { SERVICE_STATUS_STORE_FEATURE_NAME } from './constants/service-status-store.constants';
import { serviceStatusReducer } from './containers/store/reducers/service-status.reducers';
import { ServiceStatusIconPipe } from './pipes/service-status-icon.pipe';

@NgModule({
  declarations: [ServiceStatusComponent, ServiceStatusIconPipe],
  imports: [
    CommonModule,
    EffectsModule.forFeature([ServiceStatusEffects]),
    StoreModule.forFeature(
      SERVICE_STATUS_STORE_FEATURE_NAME,
      serviceStatusReducer
    ),
  ],
})
export class ServiceStatusModule {}
