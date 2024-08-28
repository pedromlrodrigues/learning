package com.peterlimz.springcoredemo;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Lazy
@Component
public class TennisCoachImpl implements Coach {

    TennisCoachImpl() {
        System.out.println("In Constructor: " + getClass().getSimpleName());
    }

    @Override
    public String getDailyWorkout() {
        return "Practice row for 30 minutes!";
    }
}
