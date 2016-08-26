import { Injectable } from '@angular/core';

import { FirebaseAuthState } from 'angularfire2';

import { CoreFirebaseService } from '../shared/core/core-firebase.service';

@Injectable()
export class AuthenticationService {

  constructor(public firebaseService: CoreFirebaseService) {}

  signup(user: any): firebase.Promise<FirebaseAuthState> {
    return this.firebaseService.getFirebaseAuth().createUser(user);
  }

  login(user: any): firebase.Promise<FirebaseAuthState> {
    return this.firebaseService.getFirebaseAuth().login({
      email: user.email,
      password: user.password
    });
  }

  logout(): void {
    this.firebaseService.getFirebaseAuth().logout();
  }
}
