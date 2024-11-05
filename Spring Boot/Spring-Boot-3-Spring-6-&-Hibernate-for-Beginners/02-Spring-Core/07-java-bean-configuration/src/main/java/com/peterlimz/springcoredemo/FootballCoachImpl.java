package com.peterlimz.springcoredemo;

public class FootballCoachImpl implements Coach {

    public FootballCoachImpl() {
        System.out.println("In constructor: " + getClass().getSimpleName());
    }

    @Override
    public String getDailyWorkout() {
        return "Practice skipping for 1 hour!";
    }

}
