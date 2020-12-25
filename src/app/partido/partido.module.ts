import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartidoPageRoutingModule } from './partido-routing.module';

import { PartidoPage } from './partido.page';
import { PartidoModalPage } from '../partido-modal/partido-modal.page';
import { PartidoModalPageModule } from '../partido-modal/partido-modal.module';

@NgModule({
  // entryComponents:[
  //   PartidoModalPage
  // ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartidoPageRoutingModule,
    // PartidoModalPageModule
  ],
  declarations: [PartidoPage]
})
export class PartidoPageModule {}
