import { NgModule } from '@angular/core';
import { VaultCreateComponent } from './vault-create.component';

import { vaultCreateRouting } from './vault-create.routing';

@NgModule({
  imports: [
    vaultCreateRouting
  ],
  declarations: [
    VaultCreateComponent
  ],
  providers: []
})
export class VaultCreateModule {
}
