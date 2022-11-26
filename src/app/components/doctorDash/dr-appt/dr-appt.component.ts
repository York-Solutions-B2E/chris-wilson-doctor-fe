import { Component, Input, OnInit } from '@angular/core';
import { AppointmentObj } from 'src/app/models/Appointments';
import { DrAvailibilityObj } from 'src/app/models/DrAvailablity';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { DoctorService } from 'src/app/services/doctor.service';

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

  apptDetails: DrAvailibilityObj = new DrAvailibilityObj(); 

  constructor(
    private apptService: AppointmentsService, 
    private drAvail: DoctorService 
    ){

    

  }



  ngOnInit(): void {
    //setup buttons 
    this.cancelled = this.appt.status == "cancelled"; 
    this.pending = this.appt.status == "pending"; 
    this.confirmed = this.appt.status == "confirmed";

    this.drAvail.getApptDetails(this.appt.timeSlot).subscribe( res => {
      
      this.apptDetails = res as DrAvailibilityObj

      console.log(this.apptDetails.start); 
    })
  }

  cancelAppt(){
    this.apptService.changeStatus(this.appt, "cancelled").subscribe( res => {
      this.pending = false; 
      this.cancelled = true; 
    });
  }

  confirmAppt(){
    this.apptService.changeStatus(this.appt, "confirmed").subscribe( res => {
      this.pending = false; 
      this.confirmed = true; 
    }); 
  }

  setToPending(){
    this.apptService.changeStatus(this.appt, "pending").subscribe( res => {
      this.pending = true; 
      this.confirmed = false; 
      this.cancelled = false;
    });
  }


}
