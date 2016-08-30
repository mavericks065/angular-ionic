import { Routes, RouterModule }   from '@angular/router';

import { authenticationSignupRoutes } from './authentication/authentication-signup/authentication-signup.routing';
import { authenticationLoginRoutes } from './authentication/authentication-login/authentication-login.routing';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  ...authenticationSignupRoutes,
  ...authenticationLoginRoutes
];

export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(appRoutes);
