	
import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalendarComponentOptions, CalendarModule } from 'ion2-calendar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})

export class CalendarioPage implements OnInit {

  onChange($event) {
    console.log($event);
  }


  eventSource = [];
  viewTitle: string;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  selectedDate: Date;
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController
  ) {}
 
  ngOnInit() {}

  async infoAlert(){
    await this.alertCtrl.create({
      header: "Ayuda",
      message: "En esta página podrás ver los entrenamientos y partidos programados.",
      buttons:[{
        text:'¡Entendido!'
      }]
    }).then(alert => alert.present())
  }
 
  // Cambia de fecha
  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }
 
  // Selecciona el rango de fecha y actualiza el titulo
  onViewTitleChanged(title) {
    if(title == ''){

    }
    switch(title){
      case 'January 2021':
        this.viewTitle = 'Enero'
    }
    this.viewTitle = title;
  }
 
  // Calendar event was clicked
  // async onEventSelected(event) {
  //   // Use Angular date pipe for conversion
  //   let start = formatDate(event.startTime, 'medium', this.locale);
  //   let end = formatDate(event.endTime, 'medium', this.locale);
 
  //   const alert = await this.alertCtrl.create({
  //     header: event.title,
  //     subHeader: event.desc,
  //     message: 'From: ' + start + '<br><br>To: ' + end,
  //     buttons: ['OK'],
  //   });
  //   alert.present();
  // }
 
  // createRandomEvents() {
  //   var events = [];
  //   for (var i = 0; i < 50; i += 1) {
  //     var date = new Date();
  //     var eventType = Math.floor(Math.random() * 2);
  //     var startDay = Math.floor(Math.random() * 90) - 45;
  //     var endDay = Math.floor(Math.random() * 2) + startDay;
  //     var startTime;
  //     var endTime;
  //     if (eventType === 0) {
  //       startTime = new Date(
  //         Date.UTC(
  //           date.getUTCFullYear(),
  //           date.getUTCMonth(),
  //           date.getUTCDate() + startDay
  //         )
  //       );
  //       if (endDay === startDay) {
  //         endDay += 1;
  //       }
  //       endTime = new Date(
  //         Date.UTC(
  //           date.getUTCFullYear(),
  //           date.getUTCMonth(),
  //           date.getUTCDate() + endDay
  //         )
  //       );
  //       events.push({
  //         title: 'All Day - ' + i,
  //         startTime: startTime,
  //         endTime: endTime,
  //         allDay: true,
  //       });
  //     } else {
  //       var startMinute = Math.floor(Math.random() * 24 * 60);
  //       var endMinute = Math.floor(Math.random() * 180) + startMinute;
  //       startTime = new Date(
  //         date.getFullYear(),
  //         date.getMonth(),
  //         date.getDate() + startDay,
  //         0,
  //         date.getMinutes() + startMinute
  //       );
  //       endTime = new Date(
  //         date.getFullYear(),
  //         date.getMonth(),
  //         date.getDate() + endDay,
  //         0,
  //         date.getMinutes() + endMinute
  //       );
  //       events.push({
  //         title: 'Event - ' + i,
  //         startTime: startTime,
  //         endTime: endTime,
  //         allDay: false,
  //       });
  //     }
  //   }
  //   this.eventSource = events;
  // }
 
  // removeEvents() {
  //   this.eventSource = [];
  // }
 

}