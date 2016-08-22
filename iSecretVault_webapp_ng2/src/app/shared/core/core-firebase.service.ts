import { Injectable } from '@angular/core';

import { AngularFire, AngularFireAuth } from 'angularfire2';

@Injectable()
export class CoreFirebaseService {

  constructor(private angularfire: AngularFire) {}

  getFirebaseAuth(): AngularFireAuth {
    return this.angularfire.auth;
  }

}
