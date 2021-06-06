import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private menuCtrl: MenuController, private nav: NavController, private platform: Platform) { }

  ngOnInit() {
    this.menuCtrl.enable(false, 'first')

    //Anular backbutton
    this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    })
  }
  gotoLoginPage(){
    this.nav.navigateForward(['loginscreen'])
  }

  registerUser(){
    this.nav.navigateForward(['signup'])
  }
}
