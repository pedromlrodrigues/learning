package com.peterlimz.springcoredemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Lazy
@RestController
public class DemoController {

    private final Coach coach;

    @Autowired
    DemoController(@Qualifier("footballCoachImpl") Coach coach) {
        System.out.println("DemoController is Lazyyyyy!");
        this.coach = coach;
    }

    @GetMapping("/get-daily-workout")
    public String getDailyWorkout() {
        return coach.getDailyWorkout();
    }
}
