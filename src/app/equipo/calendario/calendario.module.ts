import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-routing.module';

import { CalendarioPage } from './calendario.page';
import { CalendarModule } from 'ion2-calendar';
import {Component} from '@angular/core' 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    CalendarioPageRoutingModule,   
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CalendarioPage]
})
export class CalendarioPageModule {}
