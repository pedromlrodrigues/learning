package com.peterlimz.restcrudapisoverview.rest;


public class StudentNotFoundException extends RuntimeException {

    public StudentNotFoundException(String message) {
        super(message);
    }
}
