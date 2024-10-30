package com.peterlimz.aopdemo.aspect;

import com.peterlimz.aopdemo.Account;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Aspect
@Component
@Order(2)
public class MyDemoLoggingAspect extends AopDeclarations {

    @AfterReturning(
            pointcut = "execution(* com.peterlimz.aopdemo.dao.AccountDAO.findAccounts(..))",
            returning = "accounts")
    public void afterReturningFindAccountsAdvice(JoinPoint joinPoint, List<Account> accounts) {
        System.out.println("=====> @AfterReturning afterReturningFindAccountsAdvice");

        System.out.println("=====> Result is: " + accounts);

        convertAccountNameToUpperCase(accounts);

        System.out.println("=====> Result is: " + accounts);
    }

    private void convertAccountNameToUpperCase(List<Account> accounts) {
        for (Account account : accounts) {
            String upperName = account.getName().toUpperCase();

            account.setName(upperName);
        }
    }

    @Before("forDaoPackageExcludingGettersAndSetters()")
    public void beforeDaoPackageExcludingGettersAndSettersAdvice(JoinPoint joinPoint) {
        System.out.println("\n ====>>> Executing @Before DaoPackageExcludingGettersAndSettersAdvice");

        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();

        System.out.println("Method: " + methodSignature);

        Object[] args = joinPoint.getArgs();

        for (Object arg : args) {
            System.out.println(arg);

            if (arg instanceof Account) {
                Account account = (Account) arg;
                System.out.println(account.getName());
                System.out.println(account.getLevel());
            }
        }
    }


}
