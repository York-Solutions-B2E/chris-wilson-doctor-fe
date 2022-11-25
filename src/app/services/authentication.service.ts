import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggerServices } from './Logger';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http:HttpClient,
    private logger:LoggerServices
    ) { }



  login(username:string, password:string):void{
    this.logger.log("attempting to sign in")

    this.logger.print();
  }
}
