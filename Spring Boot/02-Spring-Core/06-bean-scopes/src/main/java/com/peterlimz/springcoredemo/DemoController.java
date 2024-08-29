package com.peterlimz.springcoredemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    private final Coach coach;
    private final Coach anotherCoach;

    /**
     * Default bean scope is singleton, this means that "coach" and "anotherCoach"
     *  will get the same instance because they will look for the same reference in memory.
     * <p>
     * In order to change the default bean scope, we can add the annotation @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE).
     * By changing the bean scope to prototype, each injection will create its own instance of the desired bean.
     * */
    @Autowired
    DemoController(@Qualifier("footballCoachImpl") Coach coach,
                   @Qualifier("footballCoachImpl") Coach anotherCoach) {
        this.coach = coach;
        this.anotherCoach = anotherCoach;
    }

    /**
     * Returns true in case that the bean scope is singleton.
     * Returns false in case that the bean scope is prototype.
     * */
    @GetMapping("/check")
    public String check() {
        return "Comparing beans: coach == anotherCoach, " + (coach == anotherCoach);
    }

    @GetMapping("/get-daily-workout")
    public String getDailyWorkout() {
        return coach.getDailyWorkout();
    }

}
