import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscribable, Subscriber, Subscription, take } from 'rxjs';
import { AvailObj } from 'src/app/models/AvailObj';
import { User } from 'src/app/models/User';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AvailTimeService } from 'src/app/services/avail-time.service';
import { LoggerService } from 'src/app/services/logger.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

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


  test: AvailObj = new AvailObj(); 

  constructor(
    private logger: LoggerService,
    private msg: MessageService,
    private router: Router,
    private authentication: AuthenticationService,
    private apptService: AppointmentsService, 
    private userService: UserService, 
    private availTime: AvailTimeService
  ) { 
    //check if anyone is logged in and react when the user logs out
    this.authentication.currentUser.pipe(take(1)).subscribe(
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

