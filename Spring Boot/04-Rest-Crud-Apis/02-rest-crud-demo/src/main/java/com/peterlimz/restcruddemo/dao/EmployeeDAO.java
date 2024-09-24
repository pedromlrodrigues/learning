package com.peterlimz.restcruddemo.dao;

import com.peterlimz.restcruddemo.entity.Employee;

import java.util.List;

public interface EmployeeDAO {

    List<Employee> findAll();
}
