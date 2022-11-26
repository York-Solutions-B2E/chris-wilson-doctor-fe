import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoggerServices } from 'src/app/services/Logger';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  //check if form is valid 
  isValid: boolean = false; 
  userNameTooShort: boolean = false; 
  passwordTooShort: boolean = false; 

  registrationForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]), 
    password: new FormControl("", [Validators.required]),
    email: new FormControl("", Validators.email),
  })

  constructor(
    private router: Router, 
    private logger: LoggerServices, 
    private userService: UserService
    ){}

  get username(): any {
    return this.registrationForm.get('username');
  }

  get password(): any {
    return this.registrationForm.get("password"); 
  }

  onTest(){
    this.userService.createNewUser(new User()).subscribe(
      response => {
        if(response){
          //do something 
        }else{
          console.log("it didn't work ")
        }
      }
    )
  }

  onSubmit(){
    this.logger.log("New user attempting to register"); 
    let username = this.registrationForm.get("username");
    let password = this.registrationForm.get("password"); 

    //check length 
    if(username!.value.length < 5){
      this.userNameTooShort = true; 
    }else{
      this.userNameTooShort = false; 
    }

    //check password length
    if(password!.value.length < 10){
      this.passwordTooShort = true; 
    }else{
      this.passwordTooShort = false; 
    }

    if(username && username.valid && password && password.valid){

      this.logger.log(`${this.username.value} has created a new user account`)

      //redirect to the login page
      this.router.navigate(["/login"]); 
      
    }
    
  }

}
