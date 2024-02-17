import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-tii',
  templateUrl: './register-tii.component.html',
  styleUrls: ['./register-tii.component.css']
})
export class RegisterTIIComponent implements OnInit{
  constructor(private userService: UserService,  private router: Router) { }

  ngOnInit(): void {
  }

  message: string ='';
  cvFile: File | null = null;
  newSubject: string = '';
  source: string = '';


  subjectsList: string[] = [
    'Mathematics', 'Physics', 'Chemistry', 'Informatics', 'Programming',
    'Serbian language and literature', 'English language', 'German language', 'Italian language',
    'French language', 'Spanish language', 'Latin language', 'Biology', 'History',
    'Geography', 'World around us', 'Something else'
  ];

  selectedSubjects: { [key: string]: boolean } = {};

  ageGroupsList: string[] = [
    'Elementary school 1-4 grade', 'Elementary school 5-8 grade', 'High school'
  ];

  selectedAgeGroups: { [key: string]: boolean } = {};

  submitForm(form: NgForm) {
    const selectedSubjectsList = Object.keys(this.selectedSubjects).filter(subject => this.selectedSubjects[subject]);
    const selectedAgeGroupsList = Object.keys(this.selectedAgeGroups).filter(ageGroup => this.selectedAgeGroups[ageGroup]);
    if (this.selectedSubjects['Something else'] && this.newSubject.trim() !== '') {
      selectedSubjectsList.push(this.newSubject.trim());
    }
    this.register(selectedSubjectsList, selectedAgeGroupsList)
  }

  register(selectedSubjectsList:any, selectedAgeGroupsList:any){
    this.userService.registerTeacherII(
      selectedSubjectsList,
      selectedAgeGroupsList,
      this.source,
      this.cvFile
      ).subscribe( respObj =>{
      if(respObj['message'] == 'ok'){
        //alert('User added. Redirecting to login page')//this.router.navigate(['/'])
        this.router.navigate(['/']);
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

  isValidFile(file: File): boolean {
    return file.type === 'application/pdf';
  }
  
  
    async onCvFileSelected(event: any) {
      this.cvFile = event.target.files[0] as File;
      if(this.isValidFile(this.cvFile)){
        this.message = ''
      }else{
        this.message = 'Invalid PDF format. Please choose a valid PDF file.'
        this.cvFile = null;
      }
    }
}
