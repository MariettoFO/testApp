import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipoPage } from './equipo.page';

const routes: Routes = [
  {
    path: '',
    component: EquipoPage
  },
  {
    path: 'plantilla',
    loadChildren: () => import('./plantilla/plantilla.module').then( m => m.PlantillaPageModule)
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'plantilla-modal',
    loadChildren: () => import('./plantilla-modal/plantilla-modal.module').then( m => m.PlantillaModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipoPageRoutingModule {}
