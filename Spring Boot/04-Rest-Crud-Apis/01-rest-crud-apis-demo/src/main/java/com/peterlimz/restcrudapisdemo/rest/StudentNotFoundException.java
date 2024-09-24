package com.peterlimz.restcrudapisdemo.rest;


public class StudentNotFoundException extends RuntimeException {

    public StudentNotFoundException(String message) {
        super(message);
    }
}
