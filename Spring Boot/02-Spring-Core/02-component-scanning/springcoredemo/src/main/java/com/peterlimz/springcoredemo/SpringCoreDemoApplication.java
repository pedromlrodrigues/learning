package com.peterlimz.springcoredemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
        scanBasePackages = {
                "com.peterlimz.springcoredemo",
                "com.peterlimz.util"})
public class SpringCoreDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringCoreDemoApplication.class, args);
    }

}
