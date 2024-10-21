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

    @Before("execution(public void com.peterlimz.aopdemo.dao.AccountDAO.addAccount())")
    public void beforeAddAccountOnAccountDAOAdvice() {
        System.out.println("\n ====>>> Executing @Before advice on Account DAO addAccount()");
    }

    @Before("execution(public void add*())")
    public void beforeAddWildcardAdvice() {
        System.out.println("\n ====>>> Executing @Before advice on add*()");
    }

    @Before("execution(* add*())")
    public void beforeAddWildcardAndReturnTypeAdvice() {
        System.out.println("\n ====>>> Executing @Before advice on add*() and any return type");
    }

    @Before("execution(* add*(com.peterlimz.aopdemo.Account, ..))")
    public void beforeAddWildcardWithSpecificParameterPathAdvice() {
        System.out.println("\n ====>>> Executing @Before advice on add*() with specific parameter path and any other parameters");
    }

    @Before("execution(* com.peterlimz..add*(..))")
    public void beforeAddWildcardWithAnyParametersAdvice() {
        System.out.println("\n ====>>> Executing @Before advice on add*() with any parameters");
    }
}
