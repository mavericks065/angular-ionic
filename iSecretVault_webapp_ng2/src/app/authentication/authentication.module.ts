import { NgModule } from '@angular/core';

import { AuthenticationService } from './authentication.service';
import { AuthenticationSignupModule } from './authentication-signup/authentication-signup.module';

@NgModule({
  declarations: [],
  imports: [ AuthenticationSignupModule ],
  providers: [AuthenticationService],
})
export class AuthenticationModule {

}
