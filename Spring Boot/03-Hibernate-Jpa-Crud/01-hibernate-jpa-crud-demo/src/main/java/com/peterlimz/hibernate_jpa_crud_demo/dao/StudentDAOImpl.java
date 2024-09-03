package com.peterlimz.hibernate_jpa_crud_demo.dao;

import com.peterlimz.hibernate_jpa_crud_demo.entity.Student;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
public class StudentDAOImpl implements StudentDAO {

    private final EntityManager entityManager;

    public StudentDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Student student) {
        entityManager.persist(student);
    }

    public Student findById(int id) {
        return entityManager.find(Student.class, id);
    }
}
