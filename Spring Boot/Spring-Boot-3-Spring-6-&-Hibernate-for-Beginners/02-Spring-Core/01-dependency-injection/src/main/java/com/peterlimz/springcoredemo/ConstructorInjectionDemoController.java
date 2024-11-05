package com.peterlimz.springcoredemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("constructor-injection")
public class ConstructorInjectionDemoController {

    private final Coach coach;

    /**
     * Single Constructor Injection: In Spring Framework 4.3 and later,
     *  if a class has only one constructor, Spring will automatically use that
     *  constructor for dependency injection, even if the @Autowired annotation is not present.
     *  This is called implicit constructor injection.
     *  Since your ConstructorInjectionDemoController class has only one constructor,
     *  Spring automatically injects the Coach dependency without requiring the @Autowired annotation.
     * */
    @Autowired
    ConstructorInjectionDemoController(Coach coach) {
        this.coach = coach;
    }

    @GetMapping("/get-daily-workout")
    public String getDailyWorkout() {
        return coach.getDailyWorkout();
    }
}
