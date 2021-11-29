import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { 

    //inicializo mi formulario

    this.formularioLogin = fb.group({
      username:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  iniciarSesion(){

    //Preguntamos si el formulario es valido
    if(!this.formularioLogin.invalid){

      //Obtengo esos datos del formulario
      const {username, password} = this.formularioLogin.value;
      //inicio sesión en firebase llamando al metodo de mi servicio.
      this.auth.login(username, password).then((resp)=>{
        alert("Iniciaste sesión de forma correcta");
        this.router.navigateByUrl('producto')
      }).catch(error=>{
        alert("Datos incorrectos verifique si el email o la password son de un usuario valido!");
      })
     
    }
    else{
      alert("revise los datos, son incorrectos");
    }
  }

}
