import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterTIComponent } from './register-ti/register-ti.component';
import { RegisterTIIComponent } from './register-tii/register-tii.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "hiddenlogin", component: AdminLoginComponent},
  {path: "admin", component: AdminComponent},
  {path: "student", component: StudentComponent},
  {path: "teacher", component: TeacherComponent},
  {path: "register", component: RegisterComponent},
  {path: "registerTeacher", component: RegisterTIComponent},
  {path: "registerTeacherII", component: RegisterTIIComponent},
  {path: "home", component: HomeComponent},
  {path: "passwordchange", component: ChangePasswordComponent},
  {path: '**', component: LoginComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
