package com.peterlimz.springcoredemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("field-injection")
public class FieldInjectionDemoController {

    /**
     * <a href="https://www.baeldung.com/java-spring-field-injection-cons">
     * Field injection is not recommended because:
     * 1) Null safety
     * 2) Immutability
     * 3) Design problems
     * 4) Testing
     * </a>
     */
    @Autowired
    private Coach coach;

    @GetMapping("/get-daily-workout")
    public String getDailyWorkout() {
        return coach.getDailyWorkout();
    }
}
