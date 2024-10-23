package com.peterlimz.aopdemo;

import com.peterlimz.aopdemo.dao.AccountDAO;
import com.peterlimz.aopdemo.dao.MembershipDAO;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AopDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(AopDemoApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(AccountDAO accountDAO, MembershipDAO membershipDAO) {
        return _ -> {
            demoBeforeAdvice(accountDAO, membershipDAO);
        };
    }

    private void demoBeforeAdvice(AccountDAO accountDAO, MembershipDAO membershipDAO) {
        accountDAO.addAccount(new Account("Peter", "Master Level"), true);
        accountDAO.doWork();

        accountDAO.getName();
        accountDAO.setName("Peter");
        accountDAO.getServiceCode();
        accountDAO.setServiceCode("Service Code 01");

        membershipDAO.addAccount();
        membershipDAO.goToSleep();
    }
}
