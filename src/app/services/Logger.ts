export class LoggerServices{
    logs: Message[] = [];


    constructor(){
        this.log("Logger was started");

        
    }

    log(message:string, type:string = "msg"): void{
        this.logs.push(
            {
                type:type,
                message: message 
            }
        );
    }


    print(){
        //for debugging 
        //if needed https://juristr.com/blog/2016/09/ng2-get-window-ref/
        this.logs.forEach( msg => {
            switch(msg.type){
                case "msg":console.log(msg.message); 
                break;
                case "warning": console.warn(msg.message);
                break; 
                case "err": console.error(msg.message); 

            }
            //console.log(msg.message, msg.type)
        })
    }
}

interface Message{
    message: string,
    type: string
}