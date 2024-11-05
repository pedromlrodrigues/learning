package com.peterlimz.aopdemo.aspect;

import org.aspectj.lang.annotation.Pointcut;

public class AopDeclarations {

    @Pointcut("execution(* com.peterlimz.aopdemo.dao.*.*(..))")
    public void forDaoPackage() {
    }

    @Pointcut("execution(* com.peterlimz.aopdemo.dao.*.get*(..))")
    public void forGetterMethods() {
    }

    @Pointcut("execution(* com.peterlimz.aopdemo.dao.*.set*(..))")
    public void forSetterMethods() {
    }

    @Pointcut("forDaoPackage() && !(forGetterMethods() || forSetterMethods())")
    public void forDaoPackageExcludingGettersAndSetters() {
    }
}
