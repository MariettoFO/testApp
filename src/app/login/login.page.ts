import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private menuCtrl: MenuController, private nav: NavController) { }

  ngOnInit() {
    this.menuCtrl.enable(false, 'first')
  }
  gotoLoginPage(){
    this.nav.navigateForward(['loginscreen'])
  }

  registerUser(){
    this.nav.navigateForward(['signup'])
  }
}
