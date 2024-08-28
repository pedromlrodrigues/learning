package com.peterlimz.springcoredemo;

import org.springframework.stereotype.Component;

@Component
public class FootballCoachImpl implements Coach {

    FootballCoachImpl() {
        System.out.println("In Constructor: " + getClass().getSimpleName());
    }

    @Override
    public String getDailyWorkout() {
        return "Practice skipping for 1 hour!";
    }
}
