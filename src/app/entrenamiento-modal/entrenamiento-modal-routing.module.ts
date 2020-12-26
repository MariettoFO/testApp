import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrenamientoModalPage } from './entrenamiento-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EntrenamientoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrenamientoModalPageRoutingModule {}
