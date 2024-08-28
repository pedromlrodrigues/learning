package com.peterlimz.springcoredemo;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Primary
@Component
public class FootballCoachImpl implements Coach {

    @Override
    public String getDailyWorkout() {
        return "Practice skipping for 1 hour!";
    }
}
