import { Routes, RouterModule }   from '@angular/router';

import { AuthenticationLoginComponent } from './authentication-login.component';

export const authenticationLoginRoutes: Routes = [
  { path: 'login', component: AuthenticationLoginComponent }
];

export const authenticationLoginRoutingProviders: any[] = [];

export const authenticationLoginRouting = RouterModule.forChild(authenticationLoginRoutes);
