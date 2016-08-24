import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreFirebaseService } from '../../shared/core/core-firebase.service';
import { AngularFire } from 'angularfire2';
import { VaultService } from './../vault.service';

@Component({
  selector: 'vault-unlock',
  templateUrl: 'vault-unlock.component.html',
  providers: [
    CoreFirebaseService,
    VaultService
  ],
  styleUrls: ['vault-unlock.component.css']
})
export class VaultUnlockComponent implements OnInit {

  private user: any = {};

  constructor(private firebaseService: CoreFirebaseService,
    private vaultService: VaultService,
    private router: Router,
    private angularfire: AngularFire) {
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
    *
    */
  unlock(): void {
    this.angularfire.database.object(this.user.reference).subscribe((data) => {
      if (this.checkMasterCode(data.masterCode)) {
        // store master code into vault service
        this.vaultService.storeMasterCode(this.user.masterCode);
        // navigate to categories link
        this.router.navigate(['/categories']);
      } else {
        console.log('Master code invalidated');
      }
    });
  }

  private checkMasterCode(masterCode: string): boolean {
    return this.user.masterCode === masterCode;
  }

}
