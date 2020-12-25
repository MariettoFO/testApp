import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartidoModalPageRoutingModule } from './partido-modal-routing.module';

import { PartidoModalPage } from './partido-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartidoModalPageRoutingModule
  ],
  declarations: [PartidoModalPage]
})
export class PartidoModalPageModule {}
