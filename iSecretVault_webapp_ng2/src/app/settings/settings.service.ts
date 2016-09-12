import { Injectable } from '@angular/core';

import { CoreFirebaseService } from '../shared/core/core-firebase.service';

@Injectable()
export class SettingsService {

  constructor(public firebaseService: CoreFirebaseService) {}

  updateLoginPassword(password: string): void {
    console.log('functionality not available in AngularFire');
  }

  updateMasterCode(userReference: firebase.database.Reference,
    newMasterCode: string): void {
    this.firebaseService.setValue(userReference, 'masterCode',
      newMasterCode);
  }
}
