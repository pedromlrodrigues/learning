package com.peterlimz.restcrudapisdemo.rest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class StudentErrorResponse {

    private int status;
    private String message;
    private long timeStamp;
}
