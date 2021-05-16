import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Capacitor } from '@capacitor/core';
import { AuthService } from './services/auth.service';
import { DataService } from './data.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
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
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private dataService: DataService,
    private screenOrientation: ScreenOrientation
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.AppTitle="Football Staff"
    this.bloquearOrientacion()
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    const info = Device.getInfo();
    info.then((obj) => this.dataService.plataforma = obj.platform); //devuelve ios, android, electron o web
  }

  cerrarSesion(){
    this.authService.logoutFireauth()
  }

  bloquearOrientacion(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
}
