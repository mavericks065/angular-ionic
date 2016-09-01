import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsVaultComponent } from './settings-vault.component';

import { settingsVaultRouting } from './settings-vault.routing';

@NgModule({
  imports: [
    FormsModule,
    settingsVaultRouting
  ],
  declarations: [
    SettingsVaultComponent
  ],
  providers: []
})
export class SettingsVaultModule {
}
