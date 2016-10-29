import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreFirebaseService } from '../../shared/core/core-firebase.service';
import { AngularFire } from 'angularfire2';
import { VaultService } from './../vault.service';

@Component({
  selector: 'vault-unlock',
  templateUrl: 'vault-unlock.component.html',
  providers: [
    CoreFirebaseService
  ],
  styleUrls: ['vault-unlock.component.css']
})
export class VaultUnlockComponent implements OnInit {

  private user: any = {};

  constructor(private router: Router,
    private angularfire: AngularFire,
    private firebaseService: CoreFirebaseService,
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
    *
    */
  unlock(): void {
    this.angularfire.database.object(this.user.reference).subscribe((data) => {
      if (this.checkMasterCode(data.masterCode)) {
        console.log('unlock : ');
        console.log(data.masterCode);
        // store master code into vault service
        this.vaultService.storeMasterCode(data.masterCode);

        console.log(this.vaultService.getMasterCode());
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
