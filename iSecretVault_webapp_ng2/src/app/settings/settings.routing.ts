import { Routes, RouterModule }   from '@angular/router';

import { SettingsComponent } from './settings.component';
import { SettingsLoginPasswordComponent }
  from './settings-login-password/settings-login-password.component';
import { SettingsVaultComponent }
  from './settings-vault/settings-vault.component';

export const settingsRoutes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'settings/:userId/loginPassword', component: SettingsLoginPasswordComponent },
  { path: 'settings/:userId/vault', component: SettingsVaultComponent },
];

export const settingsProviders: any[] = [];

export const settingsRouting = RouterModule.forChild(settingsRoutes);
