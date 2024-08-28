package com.peterlimz.springcoredemo;

import org.springframework.stereotype.Component;

@Component
public class CoachImpl implements Coach {

    @Override
    public String getDailyWorkout() {
        return "Practice row for 30 minutes!";
    }
}
