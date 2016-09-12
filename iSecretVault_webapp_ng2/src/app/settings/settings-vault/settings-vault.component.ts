import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { CoreFirebaseService } from '../../shared/core/core-firebase.service';
import { VaultService } from '../../vault/vault.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'isv-settings-vault',
  templateUrl: 'settings-vault.component.html',
  providers: [
    CoreFirebaseService,
    SettingsService
  ]
})
export class SettingsVaultComponent implements OnInit {

  private user: any = {};

  constructor(private router: Router,
    private angularfire: AngularFire,
    private firebaseService: CoreFirebaseService,
    private settingsService: SettingsService,
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

  public save(): void {
    let masterCode: string = this.vaultService.getMasterCode();
    if (masterCode !== this.user.masterCode) {
      console.log('Error: old master code not good');
    } else if (this.user.newMasterCode !== this.user.newMasterCodeConfirmation) {
      console.log('Error: master codes not equal');
    } else if (masterCode === this.user.masterCode
      && this.user.newMasterCode === this.user.newMasterCodeConfirmation) {

      this.settingsService.updateMasterCode(
        this.firebaseService.buildUserReference(this.user.uid),
        this.user.newMasterCode);
      this.vaultService.storeMasterCode(this.user.newMasterCode);
      this.router.navigate(['settings']);
    }
  }
}
