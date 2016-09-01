import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { CoreFirebaseService } from '../../shared/core/core-firebase.service';
import { VaultService } from '../../vault/vault.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'isv-settings-login-password',
  templateUrl: 'settings-login-password.component.html',
  providers: [
    CoreFirebaseService,
    SettingsService
  ]
})
export class SettingsLoginPasswordComponent implements OnInit {

  private user: any = {};

  constructor(private router: Router,
    private route: ActivatedRoute,
    private angularfire: AngularFire,
    private firebaseService: CoreFirebaseService,
    private vaultService: VaultService,
    private settingsService: SettingsService) {
  }

  ngOnInit() {
    let id: string;
    this.route.params.forEach((params: Params) => {
      if (params['userId'] !== undefined) {
        id = params['userId'];
      }
    });

    this.firebaseService.getFirebaseAuth().subscribe((auth) => {
      if (auth.uid && auth.uid === id) {
        this.user.uid = auth.uid;
        this.user.reference = this.firebaseService.buildUserReference(auth.uid);
      }
    }, (error) => console.log(error));
  }

  save(): void {
    let masterCode: string = this.vaultService.getMasterCode();

    if (this.user.masterCode === masterCode
        && this.user.newPassword === this.user.newPasswordConfirmation) {
      this.settingsService.updateLoginPassword(this.user.newPassword);
    }
  }
}
