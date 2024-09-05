package com.peterlimz.hibernate_jpa_crud_demo.dao;

import com.peterlimz.hibernate_jpa_crud_demo.entity.Student;

import java.util.List;

public interface StudentDAO {

    void save(Student student);

    Student findById(int id);

    List<Student> findAll();

    List<Student> findStudentByLastName(String lastName);

    void updateStudent(Student student);

    void deleteStudent(int id);

    int deleteAll();
}
