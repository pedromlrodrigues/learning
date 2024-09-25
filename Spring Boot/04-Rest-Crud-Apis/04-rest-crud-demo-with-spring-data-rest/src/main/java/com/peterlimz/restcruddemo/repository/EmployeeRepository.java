package com.peterlimz.restcruddemo.repository;

import com.peterlimz.restcruddemo.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path = "members")
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
