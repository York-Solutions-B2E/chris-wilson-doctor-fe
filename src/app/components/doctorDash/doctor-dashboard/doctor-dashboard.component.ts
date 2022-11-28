import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { take } from 'rxjs';
import { AppointmentObj } from 'src/app/models/Appointments';
import { AvailObj } from 'src/app/models/AvailObj';

import { User } from 'src/app/models/User';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AvailTimeService } from 'src/app/services/avail-time.service';
import { LoggerService } from 'src/app/services/logger.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit, OnDestroy {




  @Input() user: User = new User();

  private appts: AppointmentObj[] = [];
  private avail: AvailObj[] = [];

  public availibility: IAvailibility[] = []; 

  constructor(
    private availService: AvailTimeService,
    private apptService: AppointmentsService,
    private userService: UserService, 
    private logger: LoggerService
  ) {


  }

  ngOnInit(): void {
    
    //get all availible times for this dr
    this.availService.getAvailTimeFor(this.user).pipe(take(1)).subscribe( avail => {
      this.avail = avail; 

      //get all appointments for this dr
      this.apptService.getApptsForDr(this.user).pipe(take(1)).subscribe( appts => {
        this.appts = appts; 
        
        //merge the 2 into one array
        this.avail.forEach( x => {
          let av: IAvailibility = {
            drAvailID: x.drID,
            drAvailTime: x.time,
            appt: null //for now 

          }; 
          //check to see of there is an appointment in that timeslot
          let test = this.appts.filter( y => y.aTime === x.id); 

          //should be only 1 in the returned array if there is one
          if(test.length){ 
            av.appt = test[0] as AppointmentObj
          }

          this.availibility.push(av); 


        });
        this.logger.log(`Dr. ${this.user.id} availablity:`); 
        this.logger.log(this.availibility); 
        
      }); 
    });
  }




  ngOnDestroy(): void {
    
  }


  addAvailibleTime(){
    console.log("Add time")
  }



}

interface IAvailibility{
  drAvailID: number; 
  drAvailTime: string; 

  appt: AppointmentObj|null; 

}
