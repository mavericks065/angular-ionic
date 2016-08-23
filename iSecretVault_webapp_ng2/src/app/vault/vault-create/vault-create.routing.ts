import { Routes, RouterModule }   from '@angular/router';

import { VaultCreateComponent } from './vault-create.component';

const vaultCreateRoutes: Routes = [
  { path: 'vault', component: VaultCreateComponent }
];

export const vaultCreateProviders: any[] = [];

export const vaultCreateRouting = RouterModule.forChild(vaultCreateRoutes);
