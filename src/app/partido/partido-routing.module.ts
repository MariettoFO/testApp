import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartidoModalPageModule } from '../partido-modal/partido-modal.module';
import { PartidoModalPage } from '../partido-modal/partido-modal.page';

import { PartidoPage } from './partido.page';

const routes: Routes = [
  {
    path: '',
    component: PartidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartidoPageRoutingModule {}
