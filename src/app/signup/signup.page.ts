import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth'
import { User } from '../interfaces';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  validationUserMessage={
    names:[
      {type:"required", message:"Por favor, introduce tu nombre completo"}
    ],
    phone:[
      {type:"required", message:"Por favor, introduce tu nº de teléfono"}
    ],
    email:[
      {type:"required", message:"Por favor, introduce tu dirección de correo"},
      {type:"pattern", message:"El Email introducido es incorecto. Prueba de nuevo"}
    ],
    password:[
      {type:"required", message:"Por favor, introduce tu contraseña"},
      {type:"minlength", message:"La contraseña debe tener al menos 6 caracteres"}
    ]
  }

  validationFormUser: FormGroup;
  loading: any;

  constructor(private nav: NavController,private router: Router, public firebaseService: FirebaseService, private navCtr: NavController, private formBuilder: FormBuilder, private authService: AuthService, public loadingCtrl: LoadingController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.validationFormUser = this.formBuilder.group({
      names: new FormControl('', Validators.compose([
        Validators.required
      ])),

      phone: new FormControl('', Validators.compose([
        Validators.required
      ])),

      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)        
      ]))

    })
  }

  registerUser(value){
    this.showAlert();
    try{
      this.authService.userRegistration(value).then(response =>{
        console.log(response);
        // const path = "users/firebase.auth().currentUser.uid"
        // const nuevoUser: User = {
        //   // uid: firebase.auth().currentUser.uid,
        //   equip: (document.getElementById("email") as HTMLInputElement).value
        // }
      // this.firebaseService.crearEquipo<User>( nuevoUser, path); //Crea campo del usuario en la bbdd
        if(response.user){
          response.user.updateProfile({
            displayName: value.names,
            email: value.email,
            phoneNumber: value.phone
          });
          this.router.navigate(['loginscreen']);
          this.loadingCtrl.dismiss();
          // this.router.navigate(['loginscreen']);
        }
      }, error=>{
        this.loadingCtrl.dismiss();
        this.errorLoading(error.message);
      })
    }catch(error){
      console.log(error)
    } 
  }

  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header: "Error al registrarse",
      message: message,
      buttons:[{
        text:'ok',
        handler:()=>{
          this.navCtr.navigateBack(['signup'])
        }
      }]
    })
    await loading.present();
  }

  async showAlert(){
    var load = await this.loadingCtrl.create({
      message: "Por favor, espera..."
    })
  }
  

}
