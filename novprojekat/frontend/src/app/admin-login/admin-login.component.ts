import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string ='';
  password: string ='';
  message: string ='';

  loginAdmin(){
    this.userService.login(this.username, this.password).subscribe((tmp: any)=>{
      let userFromDB: User = tmp;
      if(userFromDB!=null){
        if(userFromDB.type==0){
          const userString = JSON.stringify(userFromDB)
          sessionStorage.setItem("user", userString)
          this.router.navigate(['admin']);
        }
        if(userFromDB.type==1 || userFromDB.type==2){
          this.router.navigate(['/']);
        }
        else {
          this.message="Error"
        }
      }
      else{
        this.message="Error"
      }
    })
  }
}
