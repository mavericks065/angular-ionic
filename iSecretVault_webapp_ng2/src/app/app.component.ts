import { Component } from '@angular/core';

import { AuthenticationSignupComponent }
  from './authentication/authentication-signup/authentication-signup.component';

import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [ AngularFire ],
  directives: [
    AuthenticationSignupComponent
  ],
  styleUrls: ['app.component.css']
})
export class AppComponent {
  constructor(angularfire: AngularFire) {
  }
}
