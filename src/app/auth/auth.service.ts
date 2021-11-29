import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user!: Observable<any>;

  constructor(private auth: AngularFireAuth) { 
    this.user = this.auth.authState
  }

  /**
   * Método para iniciar sesión
   * parametros necesarios:
   * username: email -> string
   * password: -> string
   */
  login(username: string, password: string){

    return this.auth.signInWithEmailAndPassword(username, password);
    
  }

  /**
   * Método para cerrar sesión en firebase
   * Parametros: No necesitamos
   * 
   */
  logOut(){
    return this.auth.signOut();
  }

  currentUser(){
    return this.auth.authState;
  }


}
