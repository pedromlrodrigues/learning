package com.luv2code.springboot.demo.mycoolapp.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FunRestController {

    @GetMapping("/")
    public String sayHello() {
        return "Hello World!";
    }

    @GetMapping("/say-pedro")
    public String sayHelloPedro() {
        return "Hello World Pedro!";
    }

    @GetMapping("/dev-tools")
    public String getDevTools() {
        return "Spring Boot Dev Tools are cool!";
    }
}
