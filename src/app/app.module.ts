import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DoctorDashboardComponent } from './components/doctorDash/doctor-dashboard/doctor-dashboard.component'; 
import { LoggerService } from './services/logger.service';
import { DrApptComponent } from './components/doctorDash/dr-appt/dr-appt.component';
import { UserDashboardComponent } from './components/patientDash/user-dashboard/user-dashboard.component';

 
@NgModule({ 
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MessagesComponent,
    RegisterComponent,
    NavBarComponent,
    DoctorDashboardComponent, 
    DrApptComponent, UserDashboardComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ LoggerService, 
    AuthenticationService, 
    { provide: Window, useValue: window }//to get access to the window object
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
