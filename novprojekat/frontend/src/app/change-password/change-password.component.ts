import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService: UserService,  private router: Router) { }

  ngOnInit(): void {
    
  }


  oldPassword: string ='';
  newPassword: string ='';
  confirmNewPassword: string ='';
  

  message: string ='';

  passwordsDontMatch(): boolean {
    return !(this.newPassword === this.confirmNewPassword) 
  }

  isPasswordValid() {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z][\w.@$!%*#?&]{6,11}$/;
    return passwordPattern.test(this.newPassword);
  }

  isFormValid(): boolean {
    return this.isPasswordValid() && !this.passwordsDontMatch() ;
  }
  
  submitForm(form: NgForm) {
    this.tryChange();
  }

  tryChange(){
    let userString = sessionStorage.getItem('user') as string;
    let user = JSON.parse(userString) as User;
    this.userService.tryChange(user.username, this.oldPassword, this.newPassword).subscribe( respObj =>{
      if(respObj == 'success'){
        alert('Password change successful. Please login again.')
        this.logout()
      }
      else if(respObj == 'nomatch'){
        this.message = 'Old password incorect'
      }else if(respObj == 'Error'){
        this.message = 'Something went wrong please try again'
      }
    })

  }

  logout(): void {
    this.userService.logout()
    this.router.navigate(['/']);
  }

}
