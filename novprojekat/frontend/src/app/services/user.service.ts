import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  

  login(usernameFromForm: string, passwordFromForm: string){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post(`${this.uri}/users/login`, data)
  }

  logout(): void {
    sessionStorage.clear();
  }

  // this.username, 
  //       this.password, 
  //       this.name, 
  //       this.lastname,
  //       this.gender 
  //       this.address, 
  //       this.phone, 
  //       this.email, 
  //       this.profilePicture,
  //       this.selectedSchoolType,
  //       this.selectedCurrentGrade,
  //       this.type, 
  registerStudent(
    usernameForm: string,
    passwordForm: string,
    nameForm: string,
    lastnameForm: string,
    genderForm: string,
    addressForm: string,
    phoneForm: string,
    emailForm: string,
    profilePictureForm: File | null,
    schoolTypeForm: string,
    currentGradeForm: number,
    typeForm: number,
    ){
    let typeForm2: string = typeForm.toString(); 
    let currentGrade2: string = currentGradeForm.toString();
    let profilePicture2: File = profilePictureForm!
    const data  = new FormData();
     
      data.append('username', usernameForm)
      data.append('password', passwordForm)
      data.append('name', nameForm)
      data.append('lastname', lastnameForm)
      data.append('gender', genderForm)
      data.append('address', addressForm)
      data.append('phone', phoneForm)
      data.append('email', emailForm)
      data.append('schoolType', schoolTypeForm)
      data.append('currentGrade', currentGrade2)
      data.append('type', typeForm2)
      data.append('profilePicture', profilePicture2)
    
    return this.http.post<{message: string}>(`${this.uri}/users/registerStudent`, data)
  }

  registerTeacherI(
    usernameForm: string,
    passwordForm: string,
    nameForm: string,
    lastnameForm: string,
    genderForm: string,
    addressForm: string,
    phoneForm: string,
    emailForm: string,
    profilePictureForm: File | null,
    typeForm: number,
    ){
    let typeForm2: string = typeForm.toString(); 
    let profilePicture2: File = profilePictureForm!
    sessionStorage.setItem('teacherIusername', usernameForm)
    const data  = new FormData();
     
      data.append('username', usernameForm)
      data.append('password', passwordForm)
      data.append('name', nameForm)
      data.append('lastname', lastnameForm)
      data.append('gender', genderForm)
      data.append('address', addressForm)
      data.append('phone', phoneForm)
      data.append('email', emailForm)
      data.append('type', typeForm2)
      data.append('profilePicture', profilePicture2)
    
    return this.http.post<{message: string}>(`${this.uri}/users/registerTeacherI`, data)
  }

  registerTeacherII(
    selectedSubjectsListForm: any,
    selectedAgeGroupsListForm: any,
    sourceForm: string,
    cvFileForm: File | null
    ){
    let cvFile2: File = cvFileForm!
    let username = sessionStorage.getItem('teacherIusername')!
    sessionStorage.clear();
    const data  = new FormData();
      
      data.append('username', username)
      data.append('selectedSubjectsList', selectedSubjectsListForm)
      data.append('selectedAgeGroupsList', selectedAgeGroupsListForm)
      data.append('source', sourceForm)
      data.append('cvFile', cvFile2)
    
    return this.http.post<{message: string}>(`${this.uri}/users/registerTeacherII`, data)
  }

  tryChange(usernameForm: String, oldPasswordForm: String, newPasswordForm: String){
    const data = {
      username: usernameForm,
      oldPassword: oldPasswordForm,
      newPassword: newPasswordForm
    }

    return this.http.patch(`${this.uri}/users/passwordChange`, data)
  }

}
