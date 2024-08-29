package com.peterlimz.springcoredemo.config;

import com.peterlimz.springcoredemo.Coach;
import com.peterlimz.springcoredemo.FootballCoachImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Flexibility: You can adapt and configure third-party components to fit your application's specific needs without altering their source code.
 * Integration: By defining these components as beans, you can easily inject them into other parts of your application using Spring’s dependency injection.
 * Centralized Configuration: All configurations for third-party components can be centralized in @Configuration classes, making the setup easy to manage and maintain.
 * <p>
 * It is also possible to set change the Bean scope to prototype in order to have different instances of that Bean.
 */
@Configuration
public class SportsConfig {

    @Bean("soccer")
    public Coach footballCoach() {
        return new FootballCoachImpl();
    }
}
