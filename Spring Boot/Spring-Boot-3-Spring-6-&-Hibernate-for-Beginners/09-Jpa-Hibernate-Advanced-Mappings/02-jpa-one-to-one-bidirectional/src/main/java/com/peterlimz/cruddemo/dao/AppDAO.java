package com.peterlimz.cruddemo.dao;

import com.peterlimz.cruddemo.entity.Instructor;
import com.peterlimz.cruddemo.entity.InstructorDetail;

public interface AppDAO {

    void save(Instructor instructor);

    Instructor findInstructorById(int id);

    void deleteInstructorById(int id);

    InstructorDetail findInstructorDetailById(int id);

    void deleteInstructorDetailById(int id);
}
