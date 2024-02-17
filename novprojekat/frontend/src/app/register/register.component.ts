import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,  private router: Router) { this.type = 1 }

  ngOnInit(): void {
  }

  username: string ='';
  password: string ='';
  confirmPassword: string ='';
  
  email: string ='';
  
  address: string ='';
  phone: string ='';
  
  name: string ='';
  lastname: string ='';

  gender: string ='';
  
  
  type: number = 1;
  message: string ='';

  selectedSchoolType: string = '';
  selectedCurrentGrade: number = 0;

  profilePicture: File | null = null;

  isValidImage(file: File): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const allowedFormats = ['image/jpeg', 'image/png'];
    if (!allowedFormats.includes(file.type)) {
      resolve(false);
    }

    const img = new Image();
    img.onload = () => {
      if (img.width >= 100 && img.width <= 300 && img.height >= 100 && img.height <= 300) {
        resolve(true);
      } else {
        resolve(false);
      }
    };
    img.onerror = () => {
      resolve(false);
    };
    img.src = URL.createObjectURL(file);
  });
}


  async onProfilePictureSelected(event: any) {
    this.profilePicture = event.target.files[0] as File;
    if(await this.isValidImage(this.profilePicture)){
      this.message = ''
    }else{
      this.message = 'Your picture is not appropriate size (change it or default picture will be used instead)'
      this.profilePicture = null;
    }
  }

  submitForm(form: NgForm) {
    this.register();
  }

  register(){
      this.userService.registerStudent(
        this.username, 
        this.password, 
        this.name, 
        this.lastname,
        this.gender, 
        this.address, 
        this.phone, 
        this.email, 
        this.profilePicture,
        this.selectedSchoolType,
        this.selectedCurrentGrade,
        this.type, 

        ).subscribe( respObj =>{
        if(respObj['message'] == 'ok'){
          //alert('User added. Redirecting to login page')//this.router.navigate(['/'])
          this.message = 'ok'
        }else if(respObj['message'] == 'usernameTaken'){
          this.message = 'Username is already taken'
        }else if(respObj['message'] == 'emailTaken'){
          this.message = 'Email is already taken'
        }
        else{
          this.message = 'Error'
        }
      }
      );
  }

  isPasswordValid() {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z][\w.@$!%*#?&]{6,11}$/;
    return passwordPattern.test(this.password);
  }

  isFormValid(): boolean {
    return this.isPasswordValid() && !this.passwordsDontMatch() ;
  }

  passwordsDontMatch(): boolean {
    return !(this.password === this.confirmPassword) 
  }

  

}
