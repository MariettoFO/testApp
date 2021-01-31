import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
      {type:"required", message:"Por favor, introduce tu Contraseña"},
      {type:"minlength", message:"La contraseña debe tener minimo 8 caracteres"}
    ]
  }

  validationFormUser: FormGroup;

  constructor(public formBuilder: FormBuilder, public authService: AuthService, private router: Router) { }

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
  }
  LoginUser(value){
    console.log("I am logged in");
    try{
      this.authService.loginFireauth(value).then ( resp =>{
        console.log(resp);
        this.router.navigate(['home'])
      })
    }catch(err){
      console.log(err);
    }
  }

}
