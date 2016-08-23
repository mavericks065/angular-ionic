import { Component, OnInit } from '@angular/core';

import { CoreFirebaseService } from '../../shared/core/core-firebase.service';
import { VaultService } from './../vault.service';

@Component({
  selector: 'vault-create',
  templateUrl: 'vault-create.component.html',
  providers: [
    CoreFirebaseService,
    VaultService
  ],
  styleUrls: ['vault-create.component.css']
})
export class VaultCreateComponent implements OnInit {

  private user: any = {};

  constructor(private firebaseService: CoreFirebaseService,
    private vaultService: VaultService) {
  }

  ngOnInit() {
    this.firebaseService.getFirebaseAuth().subscribe((auth) => {
      if (auth.uid) {
        this.user.uid = auth.uid;
        this.user.reference = this.firebaseService.buildUserReference(auth.uid);
      }
    }, (error) => console.log(error));
  }

  /**
    * Set up user database
    */
  create(): void {
    if (this.validateMasterCodes()) {
      this.setUserData(this.user.masterCode);
      this.vaultService.storeMasterCode(this.user.masterCode);
    } else {
      console.log('the 2 master codes need to be equal.');
    }
  }

  /**
    * Check the validity  of the two master codes entered by the user
    */
  private validateMasterCodes() {
    return this.user.masterCode === this.user.masterCodeConfirmation;
  }

  /**
    * Insert a new master password
    * Insert Categories object to not have to do it later
    */
  private setUserData(masterCode: string) {
    this.firebaseService.setValue(this.user.reference, 'masterCode',
      masterCode);
    this.firebaseService.setValue(this.user.reference, 'categories', {
      description: 'List of categories of encrypted data.'
    });
  }
}
