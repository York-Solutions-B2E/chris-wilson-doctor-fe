import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subscription, throwError } from 'rxjs';
import { LoggerServices } from './Logger';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http:HttpClient,
    private logger:LoggerServices
    ) { }



  login(username:string, password:string){
    this.logger.log("attempting to sign in")


    //type has to be any because this returns an array
    return this.http.get<User[]>(`http://localhost:3000/users?username=${username}`).pipe(
      map(
        user => {
          if(user[0].password === password){
            //log user in
            return user[0]; 
          }else{
            throw new Error("Username or Password is wrong!")
          }

          
          //return user[0];
        }
      )
    )
    
    
    
    
    
    // .subscribe( data => {
    //   if(data.length > 0){
    //     let userData: User = data[0]; 
    //     if(userData.password === password){
    //       console.log("User has logged in "); 
    //     }
    //   }else{
    //     //no user with given user name 

    //   }
      
      
    //   //console.log(<User>data[0]); 
    // }); 


    

    this.logger.print();
  }
}
