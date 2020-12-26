import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.page.html',
  styleUrls: ['./plantilla.page.scss'],
})
export class PlantillaPage implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;
  jugadores: Observable<any>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.jugadores = this.dataService.getJugadores();
  }

  segmentChanged(event){
    const valorSegmento = event.detail.value;
  }

}
