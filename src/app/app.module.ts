import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { LoggerServices } from './services/Logger';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DoctorDashboardComponent } from './components/doctorDash/doctor-dashboard/doctor-dashboard.component'; 
import { DrApptComponent } from './components/doctorDash/dr-appt/dr-appt.component';
//import { MessageService } from './services/message.service';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    LoginComponent,
    MessagesComponent,
    RegisterComponent,
    NavBarComponent,
    DoctorDashboardComponent,
    DrApptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ LoggerServices, 
    AuthenticationService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
