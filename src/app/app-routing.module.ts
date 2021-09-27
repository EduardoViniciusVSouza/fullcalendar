import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component'
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginFormComponent},
  { path: 'calendar', component: FullcalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
