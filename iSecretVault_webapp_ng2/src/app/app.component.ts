import { Component } from '@angular/core';

import { NavComponent } from './shared/layouts/nav.component';

import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [ AngularFire ],
  directives: [
    NavComponent
  ],
  styleUrls: ['app.component.css']
})
export class AppComponent {
  constructor(angularfire: AngularFire) {
  }
}
