import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories.component';

import { categoriesRouting } from './categories.routing';

@NgModule({
  imports: [
    FormsModule,
    categoriesRouting
  ],
  declarations: [
    CategoriesComponent
  ],
  providers: []
})
export class CategoriesModule {
}
