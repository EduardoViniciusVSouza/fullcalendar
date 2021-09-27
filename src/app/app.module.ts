import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin  from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'

import { LoginFormComponent } from './login-form/login-form.component'

import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component'
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table'

import { FormsModule } from '@angular/forms';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { CriarEventoModalComponent } from './criar-evento-modal/criar-evento-modal.component';
import { ViewEventComponent } from './view-event/view-event.component'

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    FullcalendarComponent,
    CriarEventoModalComponent,
    ViewEventComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent],
  entryComponents: [CriarEventoModalComponent]
})
export class AppModule { }
