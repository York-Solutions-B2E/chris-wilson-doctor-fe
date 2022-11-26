import { Injectable } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  subject: Subject<any> = new Subject(); 

  constructor() { }

  getMessage():Observable<any>{
    return this.subject.asObservable(); //creates an obserable 
  }

  message(msg: string){
    this.subject.next({text: msg, type:"msg"}); 
  }

  error(msg: string){
    this.subject.next({text: msg, type:"err"});
  }

  clear(){
    this.subject.next({});
  }
}
