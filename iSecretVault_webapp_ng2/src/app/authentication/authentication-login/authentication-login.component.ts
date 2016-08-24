import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'authentication-login',
  templateUrl: 'authentication-login.component.html',
  providers: [
    AuthenticationService
  ],
  styleUrls: ['authentication-login.component.css']
})
export class AuthenticationLoginComponent {

  private user: any = {};

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  login(): void {
    this.authenticationService.login(this.user).then((result) => {
      // navigate to unlock view
      this.router.navigate(['/vault']);
    }).catch((error) => {
      console.log('error : ' + error);
    });
  }
}
