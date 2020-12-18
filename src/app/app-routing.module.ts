import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'equipo',
    loadChildren: () => import('./equipo/equipo.module').then( m => m.EquipoPageModule)
  },
  {
    path: 'partido',
    loadChildren: () => import('./partido/partido.module').then( m => m.PartidoPageModule)
  },
  {
    path: 'entrenamiento',
    loadChildren: () => import('./entrenamiento/entrenamiento.module').then( m => m.EntrenamientoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
