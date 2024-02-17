import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../model/teacher';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  
  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.fetchTeachers();
  }

  teachers: Teacher[] = [];

  fetchTeachers() {
    this.teacherService.getTeachersToApprove().subscribe(
      (teachers) => {
        this.teachers = teachers;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  approveTeacher(email: string){
    this.teacherService.postTeacher(email).subscribe((tmp: any)=>{
      
    })

  }
}
