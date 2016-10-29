import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { AuthenticationService } from '../../authentication/authentication.service';
import { VaultService } from '../../vault/vault.service';

@Component({
  selector: 'isv-nav',
  templateUrl: 'nav.component.html',
  providers: [
    AuthenticationService
  ],
  styleUrls: ['nav.component.css']
})
export class NavComponent {

  constructor(private router: Router, public angularfire: AngularFire,
    private authenticationService: AuthenticationService,
    private vaultService: VaultService) {
  }

  logout(): void {
    this.authenticationService.logout();
    this.vaultService.resetMasterCode();
    this.router.navigate(['']);
  }

  canDisplayInternalMenu(): boolean {
    console.log('canDisplayInternalMenu');
    console.log(this.vaultService.getMasterCode());
    if (this.vaultService.getMasterCode() !== '') {
      return true;
    }
    return false;
  }
}
