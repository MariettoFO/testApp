import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartidoPage } from './partido.page';

const routes: Routes = [
  {
    path: '',
    component: PartidoPage
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'modal-info',
    loadChildren: () => import('./modal-info/modal-info.module').then( m => m.ModalInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartidoPageRoutingModule {}
