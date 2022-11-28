import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { catchError, Subject, take } from 'rxjs';
import { User } from '../models/User';
import { LoggerService } from './logger.service';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path: string = "http://localhost:3000/users";


  constructor(
    private logger: LoggerService,
    private http: HttpClient,
    private msg: MessageService
  ) { }

  getListOfDr() {
    let obser = new Subject<any>();

    this.http.get<User[]>(`${this.path}`).pipe(take(1)).subscribe({
      next: res => {
        let drs: User[] = res.filter( x => x.role === "doctor");
        
        obser.next(drs); 
      },

      error: err => {
        this.msg.error(err.message);
        this.logger.log(err)

        obser.next(false)
      }
    });
    return obser;
  }

  getAllUsers() {
    let obser = new Subject<any>();
    this.http.get<User[]>(`${this.path}`).pipe(take(1)).subscribe({
      next: res => {
        obser.next(res)
      },

      error: err => {
        this.msg.error(err.message);
        this.logger.log(err)

        obser.next(false)
      }
    });
    return obser;
  }

  getUserInfo(id: number) {
    let obser = new Subject<any>();
    this.http.get<User>(`${this.path}/${id}`).pipe(take(1)).subscribe({
      next: res => {
        obser.next(res)
      },

      error: err => {
        //user wasn't found so doesn't exists
        this.msg.error(`User with id ${id} was not found`);
        this.logger.log(`User with id ${id} was not found`)
        obser.next(false)
      }
    });
    return obser;
  }

  createNewUser(user: User): Subject<any> {
    let obser = new Subject<any>();

    //first check if user exists 
    this.http.get<User[]>(`${this.path}?username=${user.username}`).pipe(take(1)).subscribe(
      response => {
        if (response.length > 0) {
          //user already exists
          this.msg.error("user already exists")
          obser.next(false)
        } else {
          //user doesn't exist

          //attempt to create 
          this.http.post<any>(`${this.path}`, { ...user }).subscribe({
            next: () => {
              this.logger.log(`${user.username} was created`)
              obser.next(true)
            },
            error: err => {
              this.logger.log(err.message);

            }
          })
        }
      }
    )
    return obser;

  }

  updateUser(user: User) {
    let observer = new Subject();

    this.http.put<any>(`${this.path}/${user.id}`, { ...user }).pipe(take(1)).subscribe({
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
