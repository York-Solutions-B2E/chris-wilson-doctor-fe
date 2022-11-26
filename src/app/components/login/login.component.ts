import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoggerServices } from 'src/app/services/Logger';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

   
  submitted: boolean = false; //indicate when waiting for server to respond
  error: boolean = false;     //show error message if there was an error

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });

  constructor(
    //private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private logger: LoggerServices,
    private msg: MessageService, 
    private userService: UserService
  ) {

    //check if user is already logged in 
    if(this.authenticationService.currentUserValue){
      //there is a current user 
      this.router.navigate(["/"]); 
    }
  }
  ngOnInit(): void {
     
  }


  get getUsername(): any {
    return this.loginForm.get('username')?.value;
  }

  get getPassword(): any{
    return this.loginForm.get('password')?.value; 
  }




  onSubmit(): void {
    
    this.login(this.getUsername, this.getPassword);
  }

  login(username:string, password:string){
    this.submitted = true;
    this.authenticationService.login(username, password).subscribe({
      next: user => {
        //user logged in 
          user.lastLogin = new Date(); 
          this.userService.updateUser(user).subscribe(
            response => {
              //user was authenticated 
              //login time was updated 
              this.router.navigate(["/"]); 

              
            }
          );  
        
      },

      error: error => {
        //there was an error 
        console.log(error)
        this.msg.error(error.message)
        this.logger.log(error.message);
        
        //clean up
        this.submitted = false;  
      }
    });
  }


  //for testing 

  adminLogin():void {
    this.login("admin", "admin"); 
  }

  doctorLogin():void{
    this.login("bobby", "123456")
  }

  patientLogin():void{
    this.login("sally", "123456"); 
  }


}
