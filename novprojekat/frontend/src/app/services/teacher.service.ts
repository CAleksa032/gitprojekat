import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../model/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  
  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getTeachersToApprove(){
    return this.http.get<Teacher[]>(`${this.uri}/users/teachers`)
  }

  postTeacher(emailForm: string) {
    const data  = {
      email:emailForm
    }
    return this.http.post(`${this.uri}/users/teachersApprove`, data)
  }

}
