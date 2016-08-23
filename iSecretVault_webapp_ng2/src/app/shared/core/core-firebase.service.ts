import { Injectable } from '@angular/core';

import { AngularFire, AngularFireAuth } from 'angularfire2';

@Injectable()
export class CoreFirebaseService {

  private fb: firebase.database.Reference;

  constructor(private angularfire: AngularFire) {
    this.fb = firebase.database().ref();
  }

  getFirebaseAuth(): AngularFireAuth {
    return this.angularfire.auth;
  }

  setValue(reference: firebase.database.Reference, node: string,
    value: any): firebase.Promise<any> {
    let result = reference.child(node).set(value);
    return result;
  }

  buildUserReference(uid: string): firebase.database.Reference {
      return this.fb.child(`users/${uid}`);
  }

}
