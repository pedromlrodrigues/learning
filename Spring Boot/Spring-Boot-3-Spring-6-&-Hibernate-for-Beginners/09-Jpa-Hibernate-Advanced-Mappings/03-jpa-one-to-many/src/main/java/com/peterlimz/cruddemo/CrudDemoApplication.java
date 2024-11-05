package com.peterlimz.cruddemo;

import com.peterlimz.cruddemo.dao.AppDAO;
import com.peterlimz.cruddemo.entity.Course;
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
            // deleteInstructorDetailById(appDAO);
            // createInstructorWithCourses(appDAO);
            // findInstructorWithCourses(appDAO);
            // findCoursesByInstructorId(appDAO);
            // updateInstructor(appDAO);
            // updateCourse(appDAO);
            deleteCourseById(appDAO);
        };
    }

    private void deleteCourseById(AppDAO appDAO) {
        appDAO.deleteCourseById(1);
    }

    private void updateCourse(AppDAO appDAO) {
        Course course = appDAO.findCourseById(1);

        course.setTitle("Test Update Title");

        appDAO.update(course);
    }

    private void updateInstructor(AppDAO appDAO) {
        Instructor instructor = appDAO.findInstructorById(1);

        instructor.setEmail("update@fake.com");
        instructor.setLastName("Rodriguez");

        appDAO.update(instructor);
    }

    private void findCoursesByInstructorId(AppDAO appDAO) {
        Instructor instructor = appDAO.findInstructorByIdJoinFetch(1);

        System.out.println(instructor);
        System.out.println(instructor.getCourses());
    }

    /**
     * @throws org.hibernate.LazyInitializationException Courses are lazy loaded by default (@OneToMany relation).
     * @implNote Instructor instructor = appDAO.findInstructorById(1); opens and closes the session
     * which means that when trying to access a lazy loaded property, it won't be able to
     * access the DB again because the session is closed.
     */
    public void findInstructorWithCourses(AppDAO appDAO) {
        Instructor instructor = appDAO.findInstructorById(1);

        System.out.println(instructor);
        System.out.println(instructor.getCourses());
    }

    private void createInstructorWithCourses(AppDAO appDAO) {
        Instructor instructor = new Instructor("Peter", "Limz", "peterlimz@fake.com");
        InstructorDetail instructorDetail = new InstructorDetail("PeterLimzFake", "Chess");
        Course course1 = new Course("Chess like a Champ");
        Course course2 = new Course("Trust the Process");

        instructor.setInstructorDetail(instructorDetail);

        instructor.add(course1);
        instructor.add(course2);

        appDAO.save(instructor);
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
