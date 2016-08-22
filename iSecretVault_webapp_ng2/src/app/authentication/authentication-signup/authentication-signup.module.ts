import { NgModule } from '@angular/core';
import { AuthenticationSignupComponent } from './authentication-signup.component';

import { authenticationSignupRouting } from './authentication-signup.routing';

@NgModule({
  imports: [
    authenticationSignupRouting
  ],
  declarations: [
    AuthenticationSignupComponent
  ],
  providers: []
})
export class AuthenticationSignupModule {

}
