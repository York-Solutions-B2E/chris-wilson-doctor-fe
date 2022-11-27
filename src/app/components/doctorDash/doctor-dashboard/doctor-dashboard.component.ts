import { Component, Input, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { AppointmentObj } from 'src/app/models/Appointments';
import { DrAvailibilityObj } from 'src/app/models/DrAvailablity';
import { User } from 'src/app/models/User';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

 


  @Input() dr: User = new User();
  
  appts: AppointmentObj[] = []; 

  //views 
  pendingApptView: boolean = false; 
  setAvailView: boolean = false; 

  constructor(
    private drService: DoctorService, 
    private apptService: AppointmentsService
  ){

    
  }


  ngOnInit(): void {
    this.apptService.getApptForDr(this.dr).subscribe( res => {
      this.appts = res; 
    })
  }

  showPendingApptView(){
    this.hideAllViews(); 

    this.pendingApptView = true; 
  }

  showAvailView(){
    this.hideAllViews(); 
    this.setAvailView = true; 
  }


  hideAllViews(){
    this.pendingApptView = false; 
    this.setAvailView = false; 
  }


}
