import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validationFormUser = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('prueba@prueba.prb')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    })
  }

}
