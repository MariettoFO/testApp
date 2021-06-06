import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router: Router, private menuCtrl: MenuController) { 
    setTimeout(() =>{
      this.router.navigateByUrl('login');
    }, 3000)
  }

  ngOnInit() {
    this.menuCtrl.enable(false, 'first')
  }

  goLogin(){
    this.router.navigateByUrl('login');
  }

}
