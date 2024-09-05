package com.peterlimz.hibernate_jpa_crud_demo;

import com.peterlimz.hibernate_jpa_crud_demo.dao.StudentDAO;
import com.peterlimz.hibernate_jpa_crud_demo.entity.Student;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class HibernateJpaCrudDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(HibernateJpaCrudDemoApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(StudentDAO studentDAO) {
        return runner -> {
            // createStudent(studentDAO);
            // createMultipleStudents(studentDAO);
            // readStudent(studentDAO);
            // queryForStudents(studentDAO);
            // queryForStudentByLastName(studentDAO, "Limz");
            // queryForStudentByLastName(studentDAO, "Doe");
            // updateStudent(studentDAO);
            // deleteStudent(studentDAO);
            deleteAll(studentDAO);
        };
    }

    private void deleteAll(StudentDAO studentDAO) {
        int numStudentsDeleted = studentDAO.deleteAll();
        System.out.println("Number of Students deleted: " + numStudentsDeleted);

    }

    private void deleteStudent(StudentDAO studentDAO) {
        studentDAO.deleteStudent(1);
    }

    private void updateStudent(StudentDAO studentDAO) {
        int studentId = 1;
        Student student = studentDAO.findById(studentId);
        student.setFirstName("Rolls");

        studentDAO.updateStudent(student);

        System.out.println("Updated Student:" + student);
    }

    private void queryForStudentByLastName(StudentDAO studentDAO, String lastName) {
        List<Student> students = studentDAO.findStudentByLastName(lastName);
        for (Student student : students) {
            System.out.println(student);
        }
    }

    private void queryForStudents(StudentDAO studentDAO) {
        List<Student> students = studentDAO.findAll();
        for (Student student : students) {
            System.out.println(student);
        }
    }

    private void readStudent(StudentDAO studentDAO) {
        // 1) Create student and save it
        Student student = new Student("Peter", "Limz", "peterzlim@gmail.com");
        studentDAO.save(student);

        // 2) Get the created student id
        int id = student.getId();

        // 3) Fetch the student by id and display the student data
        student = studentDAO.findById(id);
        System.out.println("There he is, my favourite student! " + student);
    }

    private void createMultipleStudents(StudentDAO studentDAO) {
        studentDAO.save(new Student("John", "Doe", "helloworld@gmail.com"));
        studentDAO.save(new Student("Peter", "Limz", "peterzlim@gmail.com"));
        studentDAO.save(new Student("Jukes", "Port", "jukestpor@gmail.com"));

    }

    private void createStudent(StudentDAO studentDAO) {
        studentDAO.save(new Student("John", "Doe", "helloworld@gmail.com"));
    }
}
