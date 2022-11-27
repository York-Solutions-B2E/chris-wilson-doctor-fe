import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrAvailibilityObj } from 'src/app/models/DrAvailablity';
import { User } from 'src/app/models/User';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-avail-view',
  templateUrl: './doctor-avail-view.component.html',
  styleUrls: ['./doctor-avail-view.component.css']
})
export class DoctorAvailViewComponent implements OnInit, OnDestroy {


  @Input() dr: User = new User;


  daysOfWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];

  myAvailibleTimes: DrAvailibilityObj | null = null;

  times_sub: Subscription | null = null;

  startHours:number = 0; 
  startMins: number = 0;

  endHours = 0; 
  endMins = 0; 


  constructor(
    private drService: DoctorService
  ) {



  }


  ngOnInit(): void {


    this.times_sub = this.drService.getAvailableTimes(this.dr).subscribe(res => {
      this.myAvailibleTimes = res;
      console.log(this.myAvailibleTimes)
    })

  }

  ngOnDestroy(): void {
    this.times_sub?.unsubscribe();
  }

  //day:number, startHours: number, startMins: number, endHours: number, endMins: number
  addAvail(i:number){

    //need to get values 
    //this is a ugly hack
    this.startHours = parseInt((<HTMLInputElement>document.getElementById("startHours"+i.toString())).value);
    this.startMins = parseInt((<HTMLInputElement>document.getElementById("startMins"+i.toString())).value);

    this.endHours = parseInt((<HTMLInputElement>document.getElementById("endHours"+i.toString())).value);
    this.endMins = parseInt((<HTMLInputElement>document.getElementById("endMins"+i.toString())).value);


    

    console.log(this.startHours)

    this.myAvailibleTimes?.addAvailability(i, this.startHours, this.startMins, this.endHours, this.endMins);
    
    this.drService.updateAvailability(this.dr, this.myAvailibleTimes as DrAvailibilityObj)//why do I got to do this???
  }

  deleteAvail(day: number, pos: number){
    this.myAvailibleTimes?.removeAvailability(day, pos); 
    this.drService.updateAvailability(this.dr, this.myAvailibleTimes as DrAvailibilityObj)//why do I got to do this???

  }

}
