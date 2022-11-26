import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppointmentObj } from '../models/Appointments';
import { DrAvailibilityObj } from '../models/DrAvailablity';
import { User } from '../models/User';
import { LoggerServices } from './Logger';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  baseURL = "http://localhost:3000";

  constructor(
    private logger: LoggerServices,
    private http: HttpClient,
    private msg: MessageService
  ) { }

    //get appointments 
    getApptForDr(doctor: User): Subject<any> {
      let observer = new Subject();

      this.http.get<AppointmentObj[]>(`${this.baseURL}/appointments`).subscribe(res => {
        let results: AppointmentObj[] = [];
  
        res.forEach(x => {
          if (x.doctorID === doctor.id) {
            results.push(x);
          }
        })
  
        observer.next(results)
      })
  
      return observer
  
    }

    getApptForPatient(patient: User): Subject<any> {
      let observer = new Subject();

      this.http.get<AppointmentObj[]>(`${this.baseURL}/appointments`).subscribe(res => {
        let results: AppointmentObj[] = [];
  
        res.forEach(x => {
          if (x.patientID === patient.id) {
            results.push(x);
          }
        })
  
        observer.next(results)
      })
  
      return observer
  
    }
    

    //make appointments

    createAppt(dr: User, patient: User, timeSlot: number): Subject<any>{
      let observer = new Subject();

      this.http.post<any>(`${this.baseURL}/appointments`, {
        doctorID: dr.id,
        patientID: patient.id,
        timeSlot: timeSlot,
        status: "pending"
      }).subscribe({
        next: res => {
          observer.next(res as AppointmentObj);
        },
        error: err => {
          this.msg.error(err.message);
          this.logger.log(err.message);
          observer.next(false);
        }
      })
  
      return observer;
    }
    //delete appt 

    deleteAppt(appt: AppointmentObj){
      let observer = new Subject();


    this.http.delete<any>(`${this.baseURL}/appointments/${appt.id}`).subscribe({
      next: response => {
        observer.next(true); 
      }, 
      error: err => {
        this.msg.error(err.message)
        this.logger.log(err.message);
        observer.next(false); 
      }
    })


    return observer;
    }

    //change status of appointments
    changeStatus(appt: AppointmentObj, newStatus: string){
      let observer = new Subject();
      appt.status = newStatus; 

    this.http.put<any>(`${this.baseURL}/appointments/${appt.id}`, { ...appt }).subscribe({
      next: response => {
        observer.next(true); 
      }, 
      error: err => {
        this.msg.error(err.message)
        this.logger.log(err.message);
        observer.next(false); 
      }
    })


    return observer;
    }

















}
