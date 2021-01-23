import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrenamientoPage } from './entrenamiento.page';

const routes: Routes = [
  {
    path: '',
    component: EntrenamientoPage
  },
  {
    path: 'control',
    loadChildren: () => import('./control/control.module').then( m => m.ControlPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrenamientoPageRoutingModule {}
