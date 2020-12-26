import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrenamientoModalPageRoutingModule } from './entrenamiento-modal-routing.module';

import { EntrenamientoModalPage } from './entrenamiento-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrenamientoModalPageRoutingModule
  ],
  declarations: [EntrenamientoModalPage]
})
export class EntrenamientoModalPageModule {}
