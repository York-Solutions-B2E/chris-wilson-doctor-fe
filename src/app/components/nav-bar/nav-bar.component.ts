import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {


  user:User|null = null; 
  admin:boolean = false; 
  doctor:boolean = false;


  constructor(
    private userServices: UserService, 
    private authentication: AuthenticationService
  ){
    this.user = this.authentication.currentUserValue; 
    
    if(this.user.role === "admin") this.admin = true;
    if(this.user.role === "doctor") this.doctor = true;  
  }


  logOut(){
    this.authentication.logOut(); 
  }




}
