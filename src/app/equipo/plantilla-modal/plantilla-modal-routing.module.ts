import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantillaModalPage } from './plantilla-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PlantillaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantillaModalPageRoutingModule {}
