package com.peterlimz.springcoredemo;

import org.springframework.stereotype.Component;

@Component
public class FootballCoachImpl implements Coach {

    @Override
    public String getDailyWorkout() {
        return "Practice skipping for 1 hour!";
    }
}
