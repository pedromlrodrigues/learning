package com.peterlimz.restcrudapisdemo.rest;

import com.peterlimz.restcrudapisdemo.entity.Student;
import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class StudentController {

    private List<Student> students;

    @PostConstruct
    public void loadData() {
        students = new ArrayList<>();

        students.add(new Student("Pedro", "Rodrigues"));
        students.add(new Student("Margarida", "Palhares"));
        students.add(new Student("Erling", "Haaland"));
    }

    @GetMapping("/students")
    public List<Student> getStudents() {
        return this.students;
    }

    @GetMapping(value = "/student/{id}")
    public Student getStudentById(@PathVariable int id) {
        return this.students.get(id);
    }
}
