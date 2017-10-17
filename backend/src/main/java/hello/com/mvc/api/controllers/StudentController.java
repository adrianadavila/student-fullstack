package hello.com.mvc.api.controllers;
import java.util.List;


import hello.Application;
import hello.com.mvc.api.entities.Student;
import hello.com.mvc.api.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
//@RequestMapping(value="/rest/student")

@RequestMapping(value="/rest")
@CrossOrigin
//(origins = {"http://localhost:3004"})
public class StudentController {

    @Autowired
    private IStudentService studentService;

    //@GetMapping("/")
    @GetMapping("all-students")
    public ResponseEntity<List<Student>> getAllStudents() {
        System.out.println("GETTING ALL STUDENTS");
        List<Student> list = studentService.getAllStudents();
        return new ResponseEntity<List<Student>>(list, HttpStatus.OK);
    }


    //@GetMapping("/{id}")
    @GetMapping("student")
    public ResponseEntity<Student> getStudent(@RequestParam(value = "id") int id) {
        System.out.println("id is:"+ id);
        Student student = studentService.getStudent(id);
        return new ResponseEntity<Student>(student, HttpStatus.OK);
    }

    //ADD--adds student
    //pass in student name and student major
    //@PostMapping("/add")
    @PostMapping("student")
    public ResponseEntity<Void> addStudent(@RequestBody Student student, UriComponentsBuilder builder) {
        boolean flag = studentService.addStudent(student);
        if (flag == false) {
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/student?id={id}").buildAndExpand(student.getId()).toUri());
        //headers.setLocation(builder.path("/add/{id}").buildAndExpand(student.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    //UPDATE--updates a students records
    //pass in a student object, returns updated student
    //NOTE: @RequestBody really is that 1 to be producing issues up in the POSTMAN API man
    //@PutMapping("/update")
    @PutMapping("student")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student) {
        studentService.updateStudent(student);
        return new ResponseEntity<Student>(student, HttpStatus.OK);
    }

    @DeleteMapping ("student")
    public ResponseEntity<Void> deleteStudent(@RequestParam("id") int id) {
        studentService.deleteStudent(id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }




}
