package com.peterlimz.aopdemo.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class MyDemoLoggingAspect {

    @Before("execution(public void addAccount())")
    public void beforeAddAccountAdvice(JoinPoint joinPoint) {
        System.out.println("\n ====>>> Executing @Before advice on addAccount()");

        // Get the method signature (contains information about the method)
        System.out.println("Method: " + joinPoint.getSignature());

        // Get the class where the method is called
        System.out.println("Class: " + joinPoint.getTarget().getClass().getSimpleName());
    }
}
