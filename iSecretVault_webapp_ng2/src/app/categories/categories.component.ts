import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VaultService } from '../vault/vault.service';
import { CoreFirebaseService } from '../shared/core/core-firebase.service';
import { AngularFire } from 'angularfire2';


@Component({
  selector: 'isv-categories',
  templateUrl: 'categories.component.html',
  providers: [
    CoreFirebaseService
  ],
  styleUrls: ['categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private user: any = {};

  constructor(private router: Router,
    private angularfire: AngularFire,
    private firebaseService: CoreFirebaseService,
    private vaultService: VaultService) {
  }

  ngOnInit() {
    this.firebaseService.getFirebaseAuth().subscribe((auth) => {
      console.log('categories component start');
      console.log(this.vaultService);
      console.log(this.vaultService.getMasterCode());
      console.log('categories component stop');
      if (auth.uid) {
        this.user.uid = auth.uid;
        this.user.reference = this.firebaseService.buildUserReference(auth.uid);
      }
    }, (error) => console.log(error));
  }

}
