import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { catchError, Subject } from 'rxjs';
import { User } from '../models/User';
import { LoggerServices } from './Logger';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path: string = "http://localhost:3000/users";


  constructor(
    private logger: LoggerServices,
    private http: HttpClient,
    private msg: MessageService
  ) { }

  createNewUser(user: User): Subject<any> {
    let obser = new Subject<any>();

    //first check if user exists 
    this.http.get<User[]>(`${this.path}?username=${user.username}`).subscribe(
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

    this.http.put<any>(`${this.path}/${user.id}`, { ...user }).subscribe({
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
