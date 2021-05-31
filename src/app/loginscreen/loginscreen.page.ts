import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../interfaces';
import firebase from 'firebase/app';
import { DataService } from '../data.service';


@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {

  validationUserMessage={
    email:[
      {type:"required", message:"Por favor, introduce tu email"},
      {type:"pattern", message:"El Email introducido es incorecto. Prueba de nuevo"}
    ],
    password:[
      {type:"required", message:"Por favor, introduce tu contraseña"},
      {type:"minlength", message:"La contraseña debe tener minimo 8 caracteres"}
    ]
  }

  validationFormUser: FormGroup;

  constructor(private menuCtrl: MenuController, private dataService: DataService, public formBuilder: FormBuilder, public firebaseService: FirebaseService, public authService: AuthService, private router: Router, private alertCtrl: AlertController, public loadingCtrl: LoadingController, private navCtr: NavController) { }

  ngOnInit() {
    this.validationFormUser = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    })
    this.menuCtrl.enable(false, 'first')
  }
  LoginUser(value){
    console.log("I am logged in");
    try{
      this.authService.loginFireauth(value).then ( resp =>{
        console.log(resp);
        this.dataService.emailUser = firebase.auth().currentUser.email
        this.router.navigate(['home']);
        // const path = "users/"
        // const nuevoEquipo: User = {
        //   uid: firebase.auth().currentUser.uid,
        //   correo: (document.getElementById("email") as HTMLInputElement).value
        // }
        // this.firebaseService.crearEquipo<User>(nuevoEquipo, path);
      }, error=>{
        this.loadingCtrl.dismiss();
        this.errorLoading(error.message);
      })
    }catch(error){
      console.log(error);
      // this.errorLoading(err.message);
    }
  }
  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header: "Error al iniciar sesión",
      message: "Compruebe que los datos introducidos sean los correctos.",
      buttons:[{
        text:'ok',
        handler:()=>{
          this.navCtr.navigateBack(['loginscreen'])
        }
      }]
    })
    await loading.present();
  }
}
