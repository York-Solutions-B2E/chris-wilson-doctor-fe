import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, flatMap, from, map, Observable, Observer, of, Subject, Subscription } from 'rxjs';
import { DrAvailibilityObj } from '../models/DrAvailablity';
import { User } from '../models/User';
import { LoggerServices } from './Logger';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  baseURL = "http://localhost:3000";

  constructor(
    private logger: LoggerServices,
    private http: HttpClient,
    private msg: MessageService
  ) { }

  getAvailableTimes(doctor: User): Subject<any> {
    let observer = new Subject();

    //this took forever to figure out... :(
    this.http.get<DrAvailibilityObj[]>(`${this.baseURL}/da`).subscribe( res => {
      let results:DrAvailibilityObj[] = []; 

      res.forEach(x => {
        if(x.doctorID ===1){
          results.push(x); 
        }
      })

      observer.next(results)
    })

    return observer

  }
}
