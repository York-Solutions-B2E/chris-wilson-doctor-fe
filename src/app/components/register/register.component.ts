import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



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

  constructor(private router: Router){}

  get username(): any {
    return this.registrationForm.get('username');
  }

  get password(): any {
    return this.registrationForm.get("password"); 
  }

  onSubmit(){
    
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

      console.log("everything is valid");
      
      this.router.navigate(["/login"]); 
      
    }
    
  }

}
