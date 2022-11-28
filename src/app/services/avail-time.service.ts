import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, Subject, take } from 'rxjs';
import { AvailObj } from '../models/AvailObj';
import { User } from '../models/User';
import { LoggerService } from './logger.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
//service for managing a doctors availible time
export class AvailTimeService {

  path: string = "http://localhost:3000/docAvailability";

  constructor(
    private logger: LoggerService,
    private http: HttpClient,
    private msg: MessageService
  ) { }

  //create availible time
  createAvailTime(drID: Number, time: String): Subject<any>  {
    let obser = new Subject<any>();

    this.http.post<AvailObj>(`${this.path}`, {
      drID: drID,
      time: time
     }).pipe(take(1)).subscribe({
      next: res => {
        //saved and return with a AvailObj
        obser.next(res)
      },

      error: err => {
        //wasn't found log errors and notify user

        this.logger.log(err);
        this.msg.error("Can't create Availible time")
        obser.next(false)
      }
    });
    return obser;
  }

  //read availible time by id
  getAvailTime(id: number): Subject<any>  {
    let obser = new Subject<any>();

    this.http.get<AvailObj>(`${this.path}/id`).pipe(take(1)).subscribe({
      next: res => {
        obser.next(res as AvailObj)
      }, 

      error: err => {
        this.msg.error(`No item with id of ${id}`); 
        this.logger.log(err); 
        obser.next(false)
      }
    }); 


    return obser
  }

  //returns an array with just the availible times of a specific doctor
  getAvailTimeFor(dr: User): Subject<any> {
    let obser = new Subject<any>();

    this.http.get<AvailObj[]>(`${this.path}`).pipe(take(1)).subscribe({
      next: res => {
        //get just the ones with a specific id
        let aTime = res.filter(x => x.drID === dr.id)

        obser.next(aTime as AvailObj[])
      }, 

      error: err => {
        this.msg.error(`Can't get availible times for ${dr.firstName} ${dr.lastName}`); 
        this.logger.log(err, "error"); 
        obser.next(false); 
      }
    });

    return obser;
  }

  //update availible time 
  editAvailTime(aTime: AvailObj): Subject<any> {
    let obser = new Subject<any>();

    this.http.put<AvailObj[]>(`${this.path}/${aTime.id}`, {...aTime}).pipe(take(1)).subscribe({
      next: res => {
        //returns updated object

        obser.next(aTime as AvailObj)
      }, 

      error: err => {
        this.msg.error(`Can't update availible time`); 
        this.logger.log(err, "error"); 
        obser.next(false); 
      }
    });

    return obser;
  }

  //delete availible time 
  deleteAvailTime(aTime: AvailObj): Subject<any>{
    let obser = new Subject<any>();

    this.http.delete<AvailObj[]>(`${this.path}/${aTime.id}`).pipe(take(1)).subscribe({
      next: res => {
        //returns ???
        console.log(res)

        obser.next(true)
      }, 

      error: err => {
        this.msg.error(`Can't delete availible time`); 
        this.logger.log(err); 
        obser.next(false); 
      }
    });

    return obser;
  }
}
