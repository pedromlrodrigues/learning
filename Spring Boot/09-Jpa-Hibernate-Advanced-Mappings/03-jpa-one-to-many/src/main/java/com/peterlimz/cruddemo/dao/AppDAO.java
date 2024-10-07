package com.peterlimz.cruddemo.dao;

import com.peterlimz.cruddemo.entity.Course;
import com.peterlimz.cruddemo.entity.Instructor;
import com.peterlimz.cruddemo.entity.InstructorDetail;

import java.util.List;

public interface AppDAO {

    void save(Instructor instructor);

    Instructor findInstructorById(int id);

    void deleteInstructorById(int id);

    InstructorDetail findInstructorDetailById(int id);

    void deleteInstructorDetailById(int id);

    List<Course> findCoursesByInstructorId(int id);

    Instructor findInstructorByIdJoinFetch(int id);
}
