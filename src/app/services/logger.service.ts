import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  //store logs in an array 
  private logs: Message[] = [];

  //service for logging info
  //helpful for troubleshooting issues 
  constructor(private window: Window) {
    this.log("Logger was started");

    //stupid typescript I know it doesn't exist, I'm add it to the windows object, 
    //so I can access it from the console. 
    //this tells the compiler to ignore the next line
    // @ts-ignore
    window.printLog = this.print.bind(this)

  }

  //add a message 
  log(message: any, type: string = "msg"): void {
    this.logs.push(
      {
        type: type,
        message: message
      }
    );
  }


  //send the log to the console. 
  print() {
    console.group(); //group to make easier to seperate multiple print calls
    this.logs.forEach(msg => {
      switch (msg.type) {
        case "msg": console.log(msg.message);
          break;
        case "warning": console.warn(msg.message);
          break;
        case "err": console.error(msg.message);

      }
      //console.log(msg.message, msg.type)
    })

    console.groupEnd();
  }
}

//type of object used in the array
interface Message {
  message: string,
  type: string
}