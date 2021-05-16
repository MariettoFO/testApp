import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { DataService } from '../data.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
})
export class EquipoPage {

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  

}
