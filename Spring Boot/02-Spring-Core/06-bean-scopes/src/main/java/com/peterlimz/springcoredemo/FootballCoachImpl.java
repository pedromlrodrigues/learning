package com.peterlimz.springcoredemo;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class FootballCoachImpl implements Coach {

    @Override
    public String getDailyWorkout() {
        return "Practice skipping for 1 hour!";
    }
}
