import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VaultUnlockComponent } from './vault-unlock.component';

import { vaultUnlockRouting } from './vault-unlock.routing';

@NgModule({
  imports: [
    FormsModule,
    vaultUnlockRouting
  ],
  declarations: [
    VaultUnlockComponent
  ],
  providers: []
})
export class VaultUnlockModule {
}
