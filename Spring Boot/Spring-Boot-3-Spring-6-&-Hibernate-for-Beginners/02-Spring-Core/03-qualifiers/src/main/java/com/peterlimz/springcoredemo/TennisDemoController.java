package com.peterlimz.springcoredemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tennis")
public class TennisDemoController {

    private final Coach coach;

    @Autowired
    TennisDemoController(@Qualifier("tennisCoachImpl") Coach coach) {
        this.coach = coach;
    }

    @GetMapping("/get-daily-workout")
    public String getDailyWorkout() {
        return coach.getDailyWorkout();
    }
}
