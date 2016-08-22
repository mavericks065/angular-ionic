import { Routes, RouterModule }   from '@angular/router';

import { AuthenticationSignupComponent } from './authentication-signup.component';

const authenticationSignupRoutes: Routes = [
  { path: 'signup', component: AuthenticationSignupComponent }
];

export const authenticationSignupRoutingProviders: any[] = [];

export const authenticationSignupRouting = RouterModule.forChild(authenticationSignupRoutes);
