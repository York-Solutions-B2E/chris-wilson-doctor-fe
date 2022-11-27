import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscribable, Subscriber, Subscription, take } from 'rxjs';
import { DrAvailibilityObj } from 'src/app/models/DrAvailablity';
import { User } from 'src/app/models/User';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { LoggerServices } from 'src/app/services/Logger';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  user: User = new User();
  dr: boolean = false;
  pat: boolean = false;
  admin: boolean = false;


  test: Subscription|null = null; 

  constructor(
    private logger: LoggerServices,
    private msg: MessageService,
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

          //clean up 
          this.dr = false;
          this.pat = false;
          this.admin = false;
          this.user = new User(); 

          //redirect
          this.router.navigate(["login"]);
        } else {
          this.user = this.authentication.currentUserValue;
        }
      }
    );
  }




  ngOnDestroy(): void {
    this.test?.unsubscribe(); 
  }


  ngOnInit(): void {

    switch (this.user.role){
      case "admin": this.admin = true; 
      break; 

      case "doctor": this.dr = true; 
      break; 

      case "patient": this.pat = true; 
      break; 

      default: {
        this.logger.log("user role unknown", "error"); 
        this.msg.error("user role unknown."); 

      }
    }
  }//end of ngOnInit


  }


  //for testing

  interface timeNode{
    hours: number,
    mins: number
  }