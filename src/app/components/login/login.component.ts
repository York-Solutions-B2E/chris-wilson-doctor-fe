import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoggerServices } from 'src/app/services/Logger';
import { MessageService } from 'src/app/services/message.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

   
  submitted: boolean = false; //indicate when waiting for server to respond
  error: boolean = false;     //show error message if there was an error

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });

  constructor(
    //private route: ActivatedRoute,
    //private router: Router,
    private authenticationService: AuthenticationService,
    private logger: LoggerServices,
    private msg: MessageService
  ) {

  }


  get username(): any {
    return this.loginForm.get('username');
  }




  onSubmit(): void {
    this.submitted = true;

    //console.log(this.username.value); 

    this.authenticationService.login("gravy", "1234567").subscribe({
      next: data => {
        //user logged in 
        console.log(data);
      },

      error: error => {
        //there was an error 
        console.log("there was an error " + error)
        this.msg.message("There Was An Error")
        this.logger.log(error);
      }
    });

  }
}
