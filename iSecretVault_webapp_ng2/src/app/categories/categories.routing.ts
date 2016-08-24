import { Routes, RouterModule }   from '@angular/router';

import { CategoriesComponent } from './categories.component';

const categoriesRoutes: Routes = [
  { path: 'categories', component: CategoriesComponent }
];

export const categoriesProviders: any[] = [];

export const categoriesRouting = RouterModule.forChild(categoriesRoutes);
