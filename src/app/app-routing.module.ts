import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/login/login/login.component';
import { ServiceStatusComponent } from './modules/service-status/containers/service-status/service-status.component';
import { isAuthenticatedGuard } from './guards/is-authenticated/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './guards/redirect-to-status/is-not.authenticated.guard';
import { STATUS_ROUTE } from './constants/routes';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    title: 'Login page',
    component: LoginComponent,
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () =>
      import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path: `${STATUS_ROUTE}`,
    title: 'Service status page',
    component: ServiceStatusComponent,
    canActivate: [isAuthenticatedGuard],
    loadChildren: () =>
      import('./modules/service-status/service-status.module').then(
        m => m.ServiceStatusModule
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
