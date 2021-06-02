import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionEntrenadoresPage } from './gestion-entrenadores.page';

const routes: Routes = [
  {
    path: '',
    component: GestionEntrenadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionEntrenadoresPageRoutingModule {}
