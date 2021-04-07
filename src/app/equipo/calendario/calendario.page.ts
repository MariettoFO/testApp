import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponentOptions, CalendarModule } from 'ion2-calendar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  date: string;
  type: 'string';
  // dateMulti: string[];

  constructor(public calendary: CalendarModule, public forms: FormsModule) {
   }

  ngOnInit() {
  }

  // optionsMulti: CalendarComponentOptions = {
  //   pickMode: 'multi'
  // };

  onChange($event) {
    console.log($event);
  }

}
