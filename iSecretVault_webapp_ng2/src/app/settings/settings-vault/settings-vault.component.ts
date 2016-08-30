import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { CoreFirebaseService } from '../../shared/core/core-firebase.service';

@Component({
  selector: 'isv-settings-vault',
  templateUrl: 'settings-vault.component.html',
  providers: [
    CoreFirebaseService
  ]
})
export class SettingsVaultComponent implements OnInit {

  private user: any = {};

  constructor(private router: Router,
    private angularfire: AngularFire,
    private firebaseService: CoreFirebaseService) {
  }

  ngOnInit() {
    this.firebaseService.getFirebaseAuth().subscribe((auth) => {
      if (auth.uid) {
        this.user.uid = auth.uid;
        this.user.reference = this.firebaseService.buildUserReference(auth.uid);
      }
    }, (error) => console.log(error));
  }
}
