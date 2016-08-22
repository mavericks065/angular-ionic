import { Component } from '@angular/core';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'authentication-signup',
  templateUrl: 'authentication-signup.component.html',
  providers: [
    AuthenticationService
  ],
  styleUrls: ['authentication-signup.component.css']
})
export class AuthenticationSignupComponent {

  private user: any = {};

  constructor(private authenticationService: AuthenticationService) {
  }

  signup() {
    if (this.validatePasswords()) {
      this.authenticationService.signup(this.user).then((result) => {
        // navigate somewhere
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  private validatePasswords(): boolean {
    return this.user.password === this.user.passwordConfirmation;
  }
}
