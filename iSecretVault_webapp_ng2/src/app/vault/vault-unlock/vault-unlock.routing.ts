import { Routes, RouterModule }   from '@angular/router';

import { VaultUnlockComponent } from './vault-unlock.component';

const vaultUnlockRoutes: Routes = [
  { path: 'unlock', component: VaultUnlockComponent }
];

export const vaultUnlockProviders: any[] = [];

export const vaultUnlockRouting = RouterModule.forChild(vaultUnlockRoutes);
