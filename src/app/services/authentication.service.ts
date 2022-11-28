import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subscription, take, throwError } from 'rxjs';
import { User } from '../models/User';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
//service to authenticate a user
//usually this is done on the backend
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {
    let userInfo;
    //if there is an error parsing the data from the sessionStorage it breaks everything 
    try {
      userInfo = JSON.parse(sessionStorage.getItem('currentUser') as string);
    } catch (err) {
      this.logger.log("Error parsing data in sessionStorage, Deleting it")
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("token");
    }


    //for tracking changes with the user
    this.currentUserSubject = new BehaviorSubject<User>(userInfo); //this returns last changed info incase you need the user and to further track it
    this.currentUser = this.currentUserSubject.asObservable();
  }



  //verify user info matches info in the database
  login(username: string, password: string) {
    this.logger.log(`a ${username} is attempting to sign in`)

    //not sure why I'm returning this
    return this.http.get<User[]>(`http://localhost:3000/users?username=${username}`).pipe(
      take(1), //get 1 and close the stream
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
        }
      )
    )
  }

  //check if user info is stored in the session storage
  checkIfUserLoggedIn() {
    //TODO: finish this
    if (sessionStorage.getItem("currentUser") && sessionStorage.getItem("token")) {

    }
  }

  //logout 
  logOut(): void {

    if (this.currentUserSubject && this.currentUserSubject.value) {
      this.logger.log(`${this.currentUserSubject.value.username} logged out`);
    }

    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("token");

    //remove the user 
    this.currentUserSubject.next(null);

    //I don't understand why I don't unsubscribe the currentUserSubject
    //it generates an error when I do

  }

  //get the current user object
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
