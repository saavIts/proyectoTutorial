import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public logueado:boolean =  false;
  public email:string = '';
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.currentUser().subscribe((user)=>{
      if(user){
        console.log(user)
        this.logueado = true;
        this.email = user.email!;
      }else{
        this.logueado = false;
        console.log(user)
      }
    })
  }

  cerrarSesion(){
    this.auth.logOut().then(()=>{
      alert("Sesión cerrada con exito!");
    }).catch(()=>{
      alert("Problemas al cerrar sesión");
    })
  }

}
