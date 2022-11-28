import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AppointmentObj } from 'src/app/models/Appointments';
import { DrAvailibilityObj } from 'src/app/models/DrAvailablity';
import { User } from 'src/app/models/User';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-dr-appt',
  templateUrl: './dr-appt.component.html',
  styleUrls: ['./dr-appt.component.css']
})
export class DrApptComponent implements OnInit {

  @Input() appt: AppointmentObj = new AppointmentObj();  
  
  cancelled: boolean = false; 
  pending: boolean = false; 
  confirmed: boolean = false; 

  patient: User = new User(); 

  //apptDetails: DrAvailibilityObj = new DrAvailibilityObj(); 

  constructor(
      private apptService: AppointmentsService, 
      private UserService: UserService, 
      private msg: MessageService
    ){

    

  }



  ngOnInit(): void {
    //setup buttons 
    this.cancelled = this.appt.status === "cancelled"; 
    this.pending = this.appt.status === "pending"; 
    this.confirmed = this.appt.status === "confirmed";


    this.UserService.getUserInfo(this.appt.patientID).pipe(take(1)).subscribe( res => {
      this.patient = res; 
    }); 


  }

  cancelAppt(){
    this.apptService.deleteAppt(this.appt).pipe(take(1)).subscribe( res => {
      this.appt = new AppointmentObj(); 
    })
  }

  confirmAppt(){
    this.apptService.changeStatus(this.appt, "Confirmed").pipe(take(1)).subscribe( res => {
      if(res){
        this.msg.message(`Your appointment with ${this.patient.firstName} ${this.patient.lastName} has been confirmed.`)
      }
    }); 
  }

  


}
