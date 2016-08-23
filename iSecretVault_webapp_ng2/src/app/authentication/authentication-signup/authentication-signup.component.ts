import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  signup() {
    if (this.validatePasswords()) {
      this.authenticationService.signup(this.user).then((result) => {
        // navigate somewhere
        this.router.navigate(['/vault']);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  private validatePasswords(): boolean {
    return this.user.password === this.user.passwordConfirmation;
  }
}
