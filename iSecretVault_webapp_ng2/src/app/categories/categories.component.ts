import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private firebaseService: CoreFirebaseService,
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

}
