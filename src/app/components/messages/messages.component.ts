import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
//component for showing messages sent to the message service
export class MessagesComponent implements OnInit, OnDestroy {

  subscription:Subscription | null = null; 
  message:any; 
  showMsg = false; 

    constructor(private msg: MessageService){

    }

  ngOnInit(): void {
    this.subscription = this.msg.getMessage().subscribe(message => {
      //TODO: change css based on msg type 
      this.showMessage(message); 
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); 
  }

  showMessage(msg:String){
    this.message = msg; 

    this.showMsg = true; 

    //I would like to fade the message out but this will do
    setTimeout(() => {
      this.showMsg = false; 
    }, 4000)
  }

    
}
