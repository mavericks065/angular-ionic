import { NgModule } from '@angular/core';
import { AuthenticationLoginComponent } from './authentication-login.component';

import { authenticationLoginRouting } from './authentication-login.routing';

@NgModule({
  imports: [
    authenticationLoginRouting
  ],
  declarations: [
    AuthenticationLoginComponent
  ],
  providers: []
})
export class AuthenticationLoginModule {

}
