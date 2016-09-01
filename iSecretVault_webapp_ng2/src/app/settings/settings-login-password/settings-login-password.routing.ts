import { Routes, RouterModule }   from '@angular/router';

import { SettingsLoginPasswordComponent } from './settings-login-password.component';

export const settingsLoginPasswordRoutes: Routes = [
  { path: 'settings/:userId/loginPassword', component: SettingsLoginPasswordComponent }
];

export const settingsLoginPasswordProviders: any[] = [];

export const settingsLoginPasswordRouting = RouterModule.forChild(settingsLoginPasswordRoutes);
