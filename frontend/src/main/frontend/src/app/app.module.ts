
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';

import { StudentComponent }  from './student/component/student.component';
import { StudentService } from './student/services/student.service';

//new new login
import{LoginComponent} from './login/login.component';
import{LogoutComponent} from './logout/logout.component'

//recently added routing module
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  imports: [
        BrowserModule,
		HttpModule,
    ReactiveFormsModule,
    FormsModule, //newwwwww
    AppRoutingModule //new routing added
  ],
  declarations: [
        AppComponent,
    StudentComponent,
    LoginComponent,
    LogoutComponent
  ],
  providers: [
        StudentService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
