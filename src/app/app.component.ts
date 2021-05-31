import { Component } from '@angular/core';
import { Plugins, SplashScreen } from '@capacitor/core';
import { MenuController, Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Capacitor } from '@capacitor/core';
import { AuthService } from './services/auth.service';
import { DataService } from './data.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Router } from '@angular/router';
const { Device } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  AppTitle: String
  constructor(
    
    private platform: Platform,
    // private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    public dataService: DataService,
    private screenOrientation: ScreenOrientation,
    public router: Router,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.AppTitle="Football Staff"
    this.platform.ready().then(() => {
      SplashScreen.hide();
      this.statusBar.styleDefault();
      this.router.navigateByUrl('splash');
      // this.splashScreen.hide();
    });
    const info = Device.getInfo();
    info.then((obj) => {
      this.dataService.plataforma = obj.platform
      if(this.dataService.plataforma != 'web'){
        this.bloquearOrientacion()
      }
    }); //devuelve ios, android, electron o web
    
  }

  cerrarSesion(){
    this.authService.logoutFireauth()
    this.menuCtrl.enable(false, 'first')
  }

  bloquearOrientacion(){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

}
