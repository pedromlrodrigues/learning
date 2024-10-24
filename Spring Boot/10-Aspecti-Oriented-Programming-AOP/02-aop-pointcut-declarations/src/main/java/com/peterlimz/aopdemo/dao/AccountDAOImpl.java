package com.peterlimz.aopdemo.dao;

import com.peterlimz.aopdemo.Account;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AccountDAOImpl implements AccountDAO {

    private String name;
    private String serviceCode;

    public String getName() {
        System.out.println(getClass() + ": getName()");

        return name;
    }

    public void setName(String name) {
        System.out.println(getClass() + ": setName()");

        this.name = name;
    }

    public String getServiceCode() {
        System.out.println(getClass() + ": getServiceCode()");

        return serviceCode;
    }

    public void setServiceCode(String serviceCode) {
        System.out.println(getClass() + ": setServiceCode()");

        this.serviceCode = serviceCode;
    }

    @Override
    public void addAccount() {
        System.out.println(getClass() + ": DOING DB WORK: ADDING AN ACCOUNT");
    }

    @Override
    public boolean addSillyAccount() {
        System.out.println(getClass() + ": RETURNING BOOLEAN: ADDING A SILLY ACCOUNT");

        return false;
    }

    @Override
    public void addAccount(Account account, boolean vipFlag) {
        System.out.println(getClass() + ": ADDING AN ACCOUNT WITH PARAMETER");
    }

    @Override
    public boolean doWork() {
        System.out.println(getClass() + ": doWork()");
        return false;
    }

    @Override
    public List<Account> findAccounts() {
        return List.of(new Account("Peter", "Master Level"), new Account("Meggy", "GOAT Level :)"));
    }
}
