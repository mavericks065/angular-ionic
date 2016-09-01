import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';

import { settingsRouting } from './settings.routing';
import { SettingsService } from './settings.service';

import { SettingsVaultModule }
  from './settings-vault/settings-vault.module';
import { SettingsLoginPasswordModule }
  from './settings-login-password/settings-login-password.module';

@NgModule({
  imports: [
    FormsModule,
    settingsRouting,
    SettingsVaultModule,
    SettingsLoginPasswordModule
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [
    SettingsService
  ]
})
export class SettingsModule {
}
