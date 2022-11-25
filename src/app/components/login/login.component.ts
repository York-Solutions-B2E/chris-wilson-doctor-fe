import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", Validators.minLength(5)), 
    password: new FormControl("")
  }); 

  constructor(
    //private route: ActivatedRoute,
    //private router: Router,
    private authenticationService: AuthenticationService
  ){
    console.log(this.loginForm.get("username")); 
  }


  get username(): any {
    return this.loginForm.get('username');
  }




  onSubmit():void{

    console.log(this.username.value); 

    this.authenticationService.login("username", "password"); 
  }
}
