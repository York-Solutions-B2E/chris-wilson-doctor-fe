import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {

  subscription:Subscription | null = null; 
  message:any; 
    constructor(private msg: MessageService){

    }

  ngOnInit(): void {
    this.subscription = this.msg.getMessage().subscribe(message => {
      this.message = message; 
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); 
  }

    
}
