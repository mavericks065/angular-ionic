import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';

import { settingsRouting } from './settings.routing';

@NgModule({
  imports: [
    FormsModule,
    settingsRouting
  ],
  declarations: [
    SettingsComponent
  ],
  providers: []
})
export class SettingsModule {
}
