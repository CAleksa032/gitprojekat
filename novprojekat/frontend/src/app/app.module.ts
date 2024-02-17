import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterTIComponent } from './register-ti/register-ti.component';
import { RegisterTIIComponent } from './register-tii/register-tii.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminLoginComponent,
    TeacherComponent,
    StudentComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ChangePasswordComponent,
    RegisterTIComponent,
    RegisterTIIComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
