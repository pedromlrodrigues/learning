package com.peterlimz.restcruddemo.service;

import com.peterlimz.restcruddemo.entity.Employee;

import java.util.List;

public interface EmployeeService {

    List<Employee> findAll();
}
