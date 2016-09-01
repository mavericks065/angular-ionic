import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsLoginPasswordComponent } from './settings-login-password.component';

import { settingsLoginPasswordRouting } from './settings-login-password.routing';

@NgModule({
  imports: [
    FormsModule,
    settingsLoginPasswordRouting
  ],
  declarations: [
    SettingsLoginPasswordComponent
  ],
  providers: []
})
export class SettingsLoginPasswordModule {
}
