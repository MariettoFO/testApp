import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth'
import { Peticiones, User } from '../interfaces';
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
    // password:[
    //   {type:"required", message:"Por favor, introduce tu contraseña"},
    //   {type:"minlength", message:"La contraseña debe tener al menos 6 caracteres"}
    // ],
    tipo:[
      {type:"required", message:"Por favor, elige el tipo de cuenta que desea"},
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

      // password: new FormControl('', Validators.compose([
      //   Validators.required,
      //   Validators.minLength(6)        
      // ])),

      tipo: new FormControl('', Validators.compose([
        Validators.required
      ]))

    })
  }

  async peticionUser(){
    this.showAlert();
    try{
      var peticion: Peticiones
      peticion = {
        nombre: (document.getElementById("nombre") as HTMLInputElement).value,
        telefono: (document.getElementById("telefono") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        tipo: (document.getElementById("tipo") as HTMLInputElement).value,
        revisado: false 
      }
      await this.firebaseService.crearEquipo<Peticiones>(peticion, 'peticion').then(obj => {
        this.alertCtrl.create({
          header: "Solicitud enviada",
          message: "El equipo de Football Staff se pondrá pronto en contacto contigo.\nTambién puede contactar con nosotros directamente enviándonos un correo a: info.fstaff@gmail.com\n¡Muchas gracias!",
          buttons:[{
            text:'ok',
            handler:()=>{
              this.navCtr.navigateBack(['login'])
            }
          }]
        }).then(alert => alert.present())
      }), error => {
        this.alertCtrl.create({
          header: "Error al enviar",
          message: "Por favor, compruebe que su conexión a internet sea correcta y vuelve a intentarlo.\n¡Muchas gracias!",
          buttons:[{
            text:'ok',
            handler:()=>{
              this.navCtr.navigateBack(['login'])
            }
          }]
        }).then(alert => alert.present())
      }

      this.loadingCtrl.dismiss();
      this.alertCtrl.create({
        header: "Solicitud enviada",
        message: "El equipo de Football Staff se pondrá pronto en contacto contigo.\nTambién puede contactar con nosotros directamente enviándonos un correo a: info.fstaff@gmail.com\n¡Muchas gracias!",
        buttons:[{
          text:'ok',
          handler:()=>{
            this.navCtr.navigateBack(['login'])
          }
        }]
      }).then(alert => alert.present())
    }catch(error){
      console.log(error)
    } 
  }

  registerUser(value){
    this.showAlert();
    try{
      this.authService.userRegistration(value).then(response =>{
        console.log(response);

        firebase.firestore().collection('users').doc(response.user.uid).set({
          nombre: (document.getElementById("nombre") as HTMLInputElement).value,
          telefono: (document.getElementById("telefono") as HTMLInputElement).value,
          correo: (document.getElementById("email") as HTMLInputElement).value,

        })
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
    await this.loadingCtrl.create({
      message: "Por favor, espera..."
    })
  }
  

}
