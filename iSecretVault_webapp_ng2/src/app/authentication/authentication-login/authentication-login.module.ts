import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AuthenticationLoginComponent } from './authentication-login.component';

import { authenticationLoginRouting } from './authentication-login.routing';

@NgModule({
  imports: [
    FormsModule,
    authenticationLoginRouting
  ],
  declarations: [
    AuthenticationLoginComponent
  ],
  providers: []
})
export class AuthenticationLoginModule {

}
