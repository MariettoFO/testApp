import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlantillaModalPageRoutingModule } from './plantilla-modal-routing.module';

import { PlantillaModalPage } from './plantilla-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlantillaModalPageRoutingModule
  ],
  declarations: [PlantillaModalPage]
})
export class PlantillaModalPageModule {}
