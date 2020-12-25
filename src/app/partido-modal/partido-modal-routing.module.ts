import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartidoModalPage } from './partido-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PartidoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartidoModalPageRoutingModule {}
