import { Component } from '@angular/core';
import { LoggerServices } from 'src/app/services/Logger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private logger: LoggerServices){
    
    logger.print(); 
  }
}
