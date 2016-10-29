import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AuthenticationSignupComponent } from './authentication-signup.component';

import { authenticationSignupRouting } from './authentication-signup.routing';

@NgModule({
  imports: [
    FormsModule,
    authenticationSignupRouting
  ],
  declarations: [
    AuthenticationSignupComponent
  ],
  providers: []
})
export class AuthenticationSignupModule {

}
