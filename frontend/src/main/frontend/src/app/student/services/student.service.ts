import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Student } from '../model/student';

@Injectable()
export class StudentService {
    //URLs for CRUD operations
    //GET all students
    allStudentsUrl = "http://localhost:8080/rest/all-students";
    studentUrl = "http://localhost:8080/rest/student";


	//Create constructor to get Http instance
	constructor(private http:Http) {
	}
	//Fetch all students
    getAllStudents(): Observable<Student[]> {
        return this.http.get(this.allStudentsUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);

    }
	//Create student
    createStudent(student: Student):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.studentUrl, student, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch student by id
    getStudentById(studentId: number): Observable<Student> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let cpParams = new URLSearchParams();
      cpParams.set('id', studentId.toString());
      let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
      return this.http.get(this.studentUrl, options)
          .map(this.extractData)
          .catch(this.handleError);
    }
	//Update student
    updateStudent(student: Student):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.studentUrl, student, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete student
    deleteStudentById(studentId: number): Observable<number> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let cpParams = new URLSearchParams();
      cpParams.set('id', studentId.toString());
      let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
      return this.http.delete(this.studentUrl, options)
          .map(success => success.status)
          .catch(this.handleError);
    }
	  private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.status);
    }
}
