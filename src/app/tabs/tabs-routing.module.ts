import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'equipo'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path:'entrenamiento',
        loadChildren: () => import('../entrenamiento/entrenamiento.module').then( m => m.EntrenamientoPageModule)
      },
      {
        path:'equipo',
        loadChildren: () => import('../equipo/equipo.module').then( m => m.EquipoPageModule)
      },
      {
        path:'partido',
        loadChildren: () => import('../partido/partido.module').then( m => m.PartidoPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
