package com.peterlimz.aopdemo.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class MyDemoLoggingAspect {

    @Pointcut("execution(* com.peterlimz.aopdemo.dao.*.*(..))")
    public void forDaoPackage() {}

    @Before("forDaoPackage()")
    public void beforeAddWildcardForReturnTypeAndPackageAndClassAndMethodAndParamsAdvice() {
        System.out.println("\n ====>>> Executing @Before advice on every method inside every class inside of the declared package");
    }

    @Before("forDaoPackage()")
    public void performApiAnalytics() {
        System.out.println("\n ====>>> Performing API analytics");
    }

}
