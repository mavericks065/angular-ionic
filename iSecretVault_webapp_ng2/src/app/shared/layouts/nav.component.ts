import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { AuthenticationService } from '../../authentication/authentication.service';
import { VaultService } from '../../vault/vault.service';

@Component({
  selector: 'isv-nav',
  templateUrl: 'nav.component.html',
  providers: [
    AuthenticationService,
    VaultService
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
    this.router.navigate(['/login']);
  }

  canDisplayInternalMenu(): boolean {
    if (this.vaultService.getMasterCode() !== '') {
      return true;
    }
    return false;
  }
}
