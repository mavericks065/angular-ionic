import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class CoreFirebaseService {

  constructor(public angularfire: AngularFire) {}

}
