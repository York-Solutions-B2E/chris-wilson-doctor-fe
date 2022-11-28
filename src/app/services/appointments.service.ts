import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, take } from 'rxjs';
import { AppointmentObj } from '../models/Appointments';
import { AvailObj } from '../models/AvailObj';
import { User } from '../models/User';
import { LoggerService } from './logger.service';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
//Service for managing appointments
export class AppointmentsService {
  baseURL = "http://localhost:3000/appointments";

  constructor(
    private logger: LoggerService,
    private http: HttpClient,
    private msg: MessageService
  ) { }



  //get appointments for a specific doctor
  getApptsForDr(doctor: User): Subject<any> {
    let observer = new Subject();

    this.http.get<AppointmentObj[]>(`${this.baseURL}`).pipe(take(1)).subscribe({
      next: res => {
        let results: AppointmentObj[] = [];

        res.forEach(x => {
          if (x.doctorID === doctor.id) {
            results.push(x);
          }
        })

        observer.next(results)
      },

      error: err => {
        this.msg.error(`Can't get appointments`);
        this.logger.log(err.message)
      }
    })

    return observer

  }

  //get appointments for a specific patient
  getApptsForPatient(patientID: number): Subject<any> {
    let observer = new Subject();

    this.http.get<AppointmentObj[]>(`${this.baseURL}`).pipe(take(1)).subscribe({
      next: res => {
        let results: AppointmentObj[] = [];

        res.forEach(x => {
          if (x.patientID === patientID) {
            results.push(x);
          }
        })

        observer.next(results)
      },

      error: err => {
        this.msg.error(`Can't get appointments`);
        this.logger.log(err.message)
      }
    })

    return observer

  }


  //make appointments
  //default status will be pending waiting for the doctor to appove them
  createAppt(drID: number, patientID: number, aTime: AvailObj): Subject<any> {
    let observer = new Subject();

    this.http.post<AppointmentObj>(`${this.baseURL}`, {
      doctorID: drID,
      patientID: patientID,
      aTime: aTime.id,
      status: "pending"
    }).pipe(take(1)).subscribe({
      next: res => {
        this.msg.message("Appointment Created");
        observer.next(res as AppointmentObj);
      },
      error: err => {
        this.msg.error(`Can't create appointment`);
        this.logger.log(err.message);
        observer.next(false);
      }
    })

    return observer;
  }


  //delete appointments
  deleteAppt(appt: AppointmentObj) {
    let observer = new Subject();


    this.http.delete<any>(`${this.baseURL}/${appt.id}`).pipe(take(1)).subscribe({
      next: response => {
        this.msg.message('Appointment deleted');
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
  changeStatus(appt: AppointmentObj, newStatus: string) {
    let observer = new Subject();
    appt.status = newStatus;

    this.http.put<any>(`${this.baseURL}/${appt.id}`, { ...appt }).pipe(take(1)).subscribe({
      next: response => {
        this.logger.log(`appointment with id of ${appt.id} was changed to ${newStatus}`);
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
