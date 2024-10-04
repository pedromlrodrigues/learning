package com.peterlimz.cruddemo;

import com.peterlimz.cruddemo.dao.AppDAO;
import com.peterlimz.cruddemo.entity.Instructor;
import com.peterlimz.cruddemo.entity.InstructorDetail;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CrudDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrudDemoApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(AppDAO appDAO) {
        return runner -> {
            // createInstructor(appDAO);
            // findInstructorById(appDAO);
            // deleteInstructorById(appDAO);
            // findInstructorDetailById(appDAO);
            deleteInstructorDetailById(appDAO);
        };
    }

    private void deleteInstructorDetailById(AppDAO appDAO) {
        appDAO.deleteInstructorDetailById(3);
    }

    private void findInstructorDetailById(AppDAO appDAO) {
        InstructorDetail instructorDetail = appDAO.findInstructorDetailById(2);

        System.out.println(instructorDetail);
        System.out.println(instructorDetail.getInstructor());
    }

    private void deleteInstructorById(AppDAO appDAO) {
        appDAO.deleteInstructorById(1);
    }

    private void findInstructorById(AppDAO appDAO) {
        Instructor instructor = appDAO.findInstructorById(2);

        System.out.println(instructor.toString());
        System.out.println(instructor.getInstructorDetail().toString());
    }

    private void createInstructor(AppDAO appDAO) {
        /* Instructor instructor = new Instructor("Peter", "Limz", "peterlimz@fake.com");

        InstructorDetail instructorDetail = new InstructorDetail("PeterLimzFake", "Chess"); */

        Instructor instructor = new Instructor("Meggy", "Palz", "meggypalz@fake.com");

        InstructorDetail instructorDetail = new InstructorDetail("MeggyPalzFake", "Piano");

        instructor.setInstructorDetail(instructorDetail);

        appDAO.save(instructor);
    }
}
