import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path:'entrenamiento',
        loadChildren: '../entrenamiento/entrenamiento.module#EntrenamientoPageModule'
      },
      {
        path:'equipo',
        loadChildren: '../equipo/equipo.module#EquipoPageModule'
      },
      {
        path:'partido',
        loadChildren: '../partido/partido.module#PartidoPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
