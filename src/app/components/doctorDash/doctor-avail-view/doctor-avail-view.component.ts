import { Component, Input, OnInit } from '@angular/core';
import { DrAvailibilityObj } from 'src/app/models/DrAvailablity';
import { User } from 'src/app/models/User';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-avail-view',
  templateUrl: './doctor-avail-view.component.html',
  styleUrls: ['./doctor-avail-view.component.css']
})
export class DoctorAvailViewComponent implements OnInit {


  @Input() dr: User = new User;
  currentDate: Date = new Date();

  days: Date[] = [];

  drAvail: DrAvailibilityObj[] = []; 

  constructor(
    private drService: DoctorService
    ) {

    this.generateDays(); 

  }

  ngOnInit(): void {
    this.drService.getAvailableTimes(this.dr).subscribe( res => {
      console.log(res)
    })

  }


  generateDays() {
    //push today 
    this.days.push(this.currentDate);

    for (let i = 1; i < 7; i++) {
      let nextDay = new Date(this.days[i-1])

      nextDay.setDate(nextDay.getDate() + 1)
      this.days.push(nextDay)
    }

  }


  generateMonth(){
    let month = []; 
    for (let week = 0; week < 5; week++) {
        for (let day = 0; day < 7; day++) {
            //...
        }    
    }
  }

  
}
