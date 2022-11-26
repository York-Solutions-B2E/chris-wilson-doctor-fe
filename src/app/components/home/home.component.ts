import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { LoggerServices } from 'src/app/services/Logger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user:User = new User(); 

  constructor(
    private logger: LoggerServices, 
    private router: Router,
    private authentication: AuthenticationService, 
    private drServices: DoctorService
    ){
      //check if anyone is logged in and react when the user logs out
      this.authentication.currentUser.subscribe(
        response => {
          if(!response){
            //no user is logged in 
            this.router.navigate(["login"]); 
          }else{
            this.user = this.authentication.currentUserValue; 
          }
        }
      ); 

      //testing 
      drServices.getAvailableTimes(this.user).subscribe(
        res => console.log(res)
      )

      drServices.createAvailableTime(this.user, Date.now(), Date.now() + (1000*60*60), 1).subscribe( res => {
        
      })
  }
}
