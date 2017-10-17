package hello.com.mvc.api.entities;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


@Entity
@Table(name ="student_info")

public class Student implements Serializable {

    //idk what this is about but we are going to put this here cuz the tut says so
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="major")
    private String major;

    public Student() {
    }

    public Student(String name, String major) {
        this.id = (int) (new Date()).getTime();
        this.name = name;
        this.major = major;
    }


    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", major='" + major + '\'' +
                '}';
    }
}