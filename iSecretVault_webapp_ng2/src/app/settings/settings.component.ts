import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { CoreFirebaseService } from '../shared/core/core-firebase.service';

@Component({
  selector: 'isv-settings',
  templateUrl: 'settings.component.html',
  providers: [
    CoreFirebaseService
  ]
})
export class SettingsComponent implements OnInit {

  private user: any = {};

  private RESET_LOGIN_PWD: string = 'loginPassword';
  private RESET_MASTER_CODE: string = 'vault';

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

  onSelect(arg: string): void {

    let url: string;
    if (arg === this.RESET_LOGIN_PWD) {
      url = ['/settings/', this.user.uid, '/loginPassword'].join('');
    } else if (arg === this.RESET_MASTER_CODE) {
      url = ['/settings/', this.user.uid, '/vault'].join('');
    }
    this.router.navigate([url]);
  }
}
