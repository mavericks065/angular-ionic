import { Routes, RouterModule }   from '@angular/router';

import { SettingsVaultComponent }  from './settings-vault.component';

export const settingsVaultRoutes: Routes = [
  { path: 'settings/:userId/vault', component: SettingsVaultComponent }
];

export const settingsVaultProviders: any[] = [];

export const settingsVaultRouting = RouterModule.forChild(settingsVaultRoutes);
