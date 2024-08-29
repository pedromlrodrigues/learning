package com.peterlimz.springcoredemo;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class FootballCoachImpl implements Coach {

    FootballCoachImpl() {
        System.out.println("In constructor: " + getClass().getSimpleName());
    }

    @Override
    public String getDailyWorkout() {
        return "Practice skipping for 1 hour!";
    }

    @PostConstruct
    public void init() {
        System.out.println("FootballCoachImpl post construct: init");
    }

    /**
     * Does not work if the bean scope is defined as prototype because the bean is not fully managed by Spring IoC container.
     * */
    @PreDestroy
    public void shutdown() throws InterruptedException {
        System.out.println("FootballCoachImpl pre destroy: shutdown");
        TimeUnit.MILLISECONDS.sleep(5000);
    }
}
