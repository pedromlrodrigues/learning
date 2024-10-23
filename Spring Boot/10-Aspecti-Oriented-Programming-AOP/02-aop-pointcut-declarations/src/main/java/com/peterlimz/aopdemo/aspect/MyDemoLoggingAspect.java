package com.peterlimz.aopdemo.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class MyDemoLoggingAspect {

    @Pointcut("execution(* com.peterlimz.aopdemo.dao.*.*(..))")
    private void forDaoPackage() {
    }

    @Pointcut("execution(* com.peterlimz.aopdemo.dao.*.get*(..))")
    private void forGetterMethods() {
    }

    @Pointcut("execution(* com.peterlimz.aopdemo.dao.*.set*(..))")
    private void forSetterMethods() {
    }

    @Pointcut("forDaoPackage() && !(forGetterMethods() || forSetterMethods())")
    private void forDaoPackageExcludingGettersAndSetters() {
    }

    @Before("forDaoPackageExcludingGettersAndSetters()")
    public void beforeDaoPackageExcludingGettersAndSettersAdvice() {
        System.out.println("\n ====>>> Executing @Before DaoPackageExcludingGettersAndSettersAdvice");
    }

    @Before("forDaoPackageExcludingGettersAndSetters()")
    public void performApiAnalytics() {
        System.out.println("\n ====>>> Performing API analytics");
    }

}
