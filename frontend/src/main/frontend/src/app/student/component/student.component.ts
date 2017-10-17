import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { StudentService } from '../services/student.service';
import { Student } from '../model/student';

@Component({
   selector: 'app-student',
   templateUrl: './student.component.html',
   styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
   //Component properties
   allStudents: Student[];
   statusCode: number;
   requestProcessing = false;
   studentIdToUpdate = null;
   processValidation = false;
   //Create form
   studentForm = new FormGroup({
       name: new FormControl('', Validators.required),
       major: new FormControl('', Validators.required)
   });
   //Create constructor to get service instance
   constructor(private studentService: StudentService) {
   }
   //Create ngOnInit() and and load students
   ngOnInit(): void {
	   this.getAllStudents();
   }
   //Fetch all students
   getAllStudents() {
        this.studentService.getAllStudents()
		  .subscribe(
                data => this.allStudents = data,
                errorCode =>  this.statusCode = errorCode);
   }
   //Handle create and update student
   onStudentFormSubmit() {
	  this.processValidation = true;
	  if (this.studentForm.invalid) {
	       return; //Validation failed, exit from method.
	  }
	  //Form is valid, now perform create or update
      this.preProcessConfigurations();
	  let name = this.studentForm.get('name').value.trim();
      let major = this.studentForm.get('major').value.trim();
	  if (this.studentIdToUpdate === null) {
      //Handle create student
      console.log('it WAS NULL');
	    let student= new Student(null, name, major);
	    this.studentService.createStudent(student)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllStudents();
					this.backToCreateStudent();
			    },
		        errorCode => this.statusCode = errorCode);
	  } else {
         //Handle update student
      let student= new Student(this.studentIdToUpdate, name, major);

	    this.studentService.updateStudent(student)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllStudents();
					this.backToCreateStudent();
			    },
		        errorCode => this.statusCode = errorCode);
	  }
   }
   //Load article by id to edit
   loadStudentToEdit(studentId: number) {
      this.preProcessConfigurations();
      this.studentService.getStudentById(studentId)
	      .subscribe(res => {
            this.studentIdToUpdate = res.id;
            this.studentForm.setValue({ name: res.name, major: res.major });
            this.processValidation = true;
            this.requestProcessing = false;

		    },
		     errorCode =>  this.statusCode = errorCode);
   }
   //Delete article
   deleteStudent(studentId: number) {
      this.preProcessConfigurations();
      this.studentService.deleteStudentById(studentId)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllStudents();
				    this.backToCreateStudent();
			    },
		        errorCode => this.statusCode = errorCode);
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;
   }
   //Go back from update to create
   backToCreateStudent() {
      this.studentIdToUpdate = null;
      this.studentForm.reset();
	  this.processValidation = false;
   }
}
