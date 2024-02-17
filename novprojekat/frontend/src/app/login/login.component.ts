import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string = '';
  password: string = '';
  message: string = '';

  login(){
    this.userService.login(this.username, this.password).subscribe((tmp: any)=>{
      let userFromDB : User = tmp;
      if(userFromDB!=null){
        if(userFromDB.type == 0){
          this.message="Error"
        }
        else{
          const userString = JSON.stringify(userFromDB)
          sessionStorage.setItem("user", userString)
          if(userFromDB.type==1){
            this.router.navigate(['student']);
          }
          else if(userFromDB.type == 2){
            this.router.navigate(['teacher']);
          }
      }}
      else{
        this.message="Wrong username or password"
      }
    })
  }
}
