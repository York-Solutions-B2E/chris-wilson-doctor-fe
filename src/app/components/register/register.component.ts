import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/models/User';
import { LoggerService } from 'src/app/services/logger.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //check if form is valid 
  isValid: boolean = false;
  userNameTooShort: boolean = false;
  passwordTooShort: boolean = false;

  registrationForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
  })

  //is this a doctor
  isDr: boolean = false; 

  constructor(
    private router: Router,
    private logger: LoggerService,
    private userService: UserService, 
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        //special link for doctors 
        //http://localhost:4200/register?doctor=true

        if(params['doctor']){
          this.isDr = params['doctor'];
        }
         

        console.log(this.isDr)
      }
    );
  }

  get username(): any {
    return this.registrationForm.get('username');
  }

  get password(): any {
    return this.registrationForm.get("password");
  }

  onSubmit() {
    this.logger.log("New user attempting to register");
    let username = this.registrationForm.get("username");
    let password = this.registrationForm.get("password");
    let firstName = this.registrationForm.get("firstName");
    let lastName = this.registrationForm.get("lastName");

    //check length 
    if (username!.value.length < 5) {
      this.userNameTooShort = true;
    } else {
      this.userNameTooShort = false;
    }

    //check password length
    if (password!.value.length < 10) {
      this.passwordTooShort = true;
    } else {
      this.passwordTooShort = false;
    }

    if (username && username.valid && password && password.valid) {

      let newUser: User = new User();
      newUser.username = username.value;
      newUser.password = password.value; //TODO: use some kind of password hash
      newUser.firstName = firstName?.value;
      newUser.lastName = lastName?.value;
      if(this.isDr){
        newUser.role = "doctor"
      }else{
        newUser.role = "patient"
      }

      this.userService.createNewUser(newUser).pipe(take(1)).subscribe(res => {
        //returns true or false
        if (res) {
          this.logger.log(`${this.username.value} has created a new user account`)

          //redirect to the login page
          this.router.navigate(["/login"]);
        }
      })



    }

  }

}
