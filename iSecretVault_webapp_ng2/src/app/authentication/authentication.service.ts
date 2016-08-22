import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class AuthenticationService {

  constructor(public angularfire: AngularFire) {}

}
