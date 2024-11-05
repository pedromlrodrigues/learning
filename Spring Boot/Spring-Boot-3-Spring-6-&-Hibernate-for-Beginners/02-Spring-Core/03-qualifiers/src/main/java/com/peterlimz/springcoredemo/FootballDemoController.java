package com.peterlimz.springcoredemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("football")
public class FootballDemoController {

    private Coach coach;

    @Autowired
    public void setCoach(@Qualifier("footballCoachImpl") Coach coach) {
        this.coach = coach;
    }

    @GetMapping("/get-daily-workout")
    public String getDailyWorkout() {
        return coach.getDailyWorkout();
    }
}
