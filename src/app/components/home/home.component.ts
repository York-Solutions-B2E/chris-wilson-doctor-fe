import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { LoggerServices } from 'src/app/services/Logger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User = new User();
  dr: boolean = false;
  pat: boolean = false;
  admin: boolean = false;

  constructor(
    private logger: LoggerServices,
    private router: Router,
    private authentication: AuthenticationService,
    private drServices: DoctorService,
    private apptService: AppointmentsService
  ) {
    //check if anyone is logged in and react when the user logs out
    this.authentication.currentUser.subscribe(
      response => {
        if (!response) {
          //no user is logged in 
          this.router.navigate(["login"]);
        } else {
          this.user = this.authentication.currentUserValue;
        }
      }
    );
  }

  
  ngOnInit(): void {

  }
}
