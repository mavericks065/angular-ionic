import { Routes, RouterModule }   from '@angular/router';

import { SettingsComponent } from './settings.component';

export const settingsRoutes: Routes = [
  { path: 'settings', component: SettingsComponent }
];

export const settingsProviders: any[] = [];

export const settingsRouting = RouterModule.forChild(settingsRoutes);
