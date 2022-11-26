import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: "", component: HomeComponent}, 
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: '**', component: HomeComponent } //TODO: change this to a 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
