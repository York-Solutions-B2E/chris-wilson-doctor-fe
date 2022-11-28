import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//services for displaying messages on top of the screen
export class MessageService implements OnDestroy {
  
  subject: Subject<any> = new Subject(); 

  constructor() { }

  ngOnDestroy(): void {
    this.subject.unsubscribe(); 
  }

  //get the subject so you can monitor messages 
  getMessage():Observable<any>{
    return this.subject.asObservable(); //creates an obserable 
  }

  //display a normal message 
  message(msg: string){
    this.subject.next({text: msg, type:"msg"}); 
  }

  //display a error message (TODO: red border and a light red background)
  error(msg: string){
    this.subject.next({text: msg, type:"err"});
  }

  //send a empty message to clear the pipe
  clear(){
    this.subject.next({});
  }


}
