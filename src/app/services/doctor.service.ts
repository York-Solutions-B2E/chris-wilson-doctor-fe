import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, flatMap, from, map, Observable, Observer, of, Subject, Subscription, take } from 'rxjs';
import { DrAvailibilityObj, TimeNode } from '../models/DrAvailablity';
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

  

  getAvailableTimes(doctor: User): Subject<DrAvailibilityObj> {
    let observer = new Subject<DrAvailibilityObj>();

    this.http.get<any>(`${this.baseURL}/docAvailability/${doctor.id}`).pipe(take(1)).subscribe(res => {
      let results = new DrAvailibilityObj(); 

      results.days = JSON.parse(res.days);
    
      observer.next(results)
    })

    return observer

  }

  

  createAvailableTime(doctor: User, avaliablity: DrAvailibilityObj): Subject<DrAvailibilityObj|boolean> {

    let observer = new Subject<DrAvailibilityObj|boolean>();

    this.http.post<any>(`${this.baseURL}/docAvailability`, {
      id: doctor.id, 
      days: JSON.stringify(avaliablity.days)
    }).pipe(take(1)).subscribe({
      next: res => {
        let results = new DrAvailibilityObj(); 

        results.days = JSON.parse(res.days);
        observer.next(results);
      },
      error: err => {
        this.msg.error(err.message);
        this.logger.log(err.message);
        observer.next(false);
      }
    })

    return observer;
  }

  updateAvailability(doctor: User, avaliablity: DrAvailibilityObj): Subject<DrAvailibilityObj|boolean>{
    let observer = new Subject<DrAvailibilityObj|boolean>();

    this.http.put<any>(`${this.baseURL}/docAvailability/${doctor.id}`, {
      days: JSON.stringify(avaliablity.days)
    }).pipe(take(1)).subscribe(res => {
      //fix date 
      observer.next(res); 
    })

    return observer
  }


  deleteAvailableTime(doctor: User, avil: DrAvailibilityObj): Subject<boolean>{
    let observer = new Subject<boolean>();

    this.http.delete<any>(`${this.baseURL}/docAvailability/${doctor.id}`).pipe(
      take(1)
    ).subscribe(res => {
      //fix date 
      observer.next(res); 
    })

    return observer
  }

}
