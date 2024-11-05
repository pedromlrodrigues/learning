package com.luv2code.springboot.demo.mycoolapp.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FunRestController {

    @Value("${car.brand}")
    private String brand;

    @Value("${car.model}")
    private String model;

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

    @GetMapping("/what-car")
    public String getCar() { return String.format("Brand: %s Model: %s", brand, model); }
}
