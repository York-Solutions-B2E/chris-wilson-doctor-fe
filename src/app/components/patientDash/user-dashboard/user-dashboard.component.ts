import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/models/User';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AvailTimeService } from 'src/app/services/avail-time.service';
import { LoggerService } from 'src/app/services/logger.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  @Input() user: User = new User(); 

  listOfDrs: User[] = []; 

  constructor(
    private availService: AvailTimeService,
    private apptService: AppointmentsService,
    private userService: UserService, 
    private logger: LoggerService
  ) {

    this.userService.getListOfDr().pipe(take(1)).subscribe( res => {
      this.listOfDrs = res; 
    })

  }
  
  ngOnInit(): void {
    
  }
  
  ngOnDestroy(): void {
    
  }
}
