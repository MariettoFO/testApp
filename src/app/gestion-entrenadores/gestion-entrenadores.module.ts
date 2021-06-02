import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionEntrenadoresPageRoutingModule } from './gestion-entrenadores-routing.module';

import { GestionEntrenadoresPage } from './gestion-entrenadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionEntrenadoresPageRoutingModule
  ],
  declarations: [GestionEntrenadoresPage]
})
export class GestionEntrenadoresPageModule {}
