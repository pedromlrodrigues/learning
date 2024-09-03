package com.peterlimz.hibernate_jpa_crud_demo;

import com.peterlimz.hibernate_jpa_crud_demo.dao.StudentDAO;
import com.peterlimz.hibernate_jpa_crud_demo.entity.Student;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HibernateJpaCrudDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(HibernateJpaCrudDemoApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(StudentDAO studentDAO) {
        return runner -> {
            // createStudent(studentDAO);

            createMultipleStudents(studentDAO);
        };
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
