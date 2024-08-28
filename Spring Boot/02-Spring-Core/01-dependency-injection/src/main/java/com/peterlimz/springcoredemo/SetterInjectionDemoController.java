package com.peterlimz.springcoredemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("setter-injection")
public class SetterInjectionDemoController {

    private Coach coach;

    /**
     * Same as:
     *  Coach coach = new CoachImpl();
     *  SetterInjectionDemoController demoController = new SetterInjectionDemoController();
     *  demoController.setCoach(coach);
     * */
    @Autowired
    public void setCoach(Coach coach) {
        this.coach = coach;
    }

    @GetMapping("/get-daily-workout")
    public String getDailyWorkout() {
        return coach.getDailyWorkout();
    }
}
