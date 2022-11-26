import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subscription, throwError } from 'rxjs';
import { LoggerServices } from './Logger';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private logger: LoggerServices
  ) {
    let userInfo;
    //if there is an error parsing the data from the sessionStorage it breaks everything 
    try {
      userInfo = JSON.parse(sessionStorage.getItem('currentUser') as string);
    } catch (err) {
      this.logger.log("Error parsing data in sessionStorage")
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("token");
    }



    this.currentUserSubject = new BehaviorSubject<User>(userInfo);
    this.currentUser = this.currentUserSubject.asObservable();
  }



  login(username: string, password: string) {
    this.logger.log(`a ${username} is attempting to sign in`)


    //type has to be any because this returns an array
    return this.http.get<User[]>(`http://localhost:3000/users?username=${username}`).pipe(
      map(
        user => {

          if (user[0].password === password) {
            //log user in
            //I'm assuming login service would provide a token 

            this.logger.log(`${username} logged in`);
            sessionStorage.setItem("currentUser", JSON.stringify(user[0]));
            sessionStorage.setItem("token", "JWTFromServer");

            this.currentUserSubject.next(user[0])

            return user[0];
          } else {
            throw new Error("Username or Password is wrong!")
          }


          //return user[0];
        }
      )
    )

    this.logger.print();
  }

  checkIfUserLoggedIn() {
    if (sessionStorage.getItem("currentUser") && sessionStorage.getItem("token")) {

    }
  }

  logOut(): void {

    if (this.currentUserSubject && this.currentUserSubject.value) {
      this.logger.log(`${this.currentUserSubject.value.username} logged out`);
    }

    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("token");
    this.currentUserSubject.next(null);

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
