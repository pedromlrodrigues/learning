package com.peterlimz.aopdemo.dao;

import com.peterlimz.aopdemo.Account;

public interface AccountDAO {

    String getName();

    void setName(String name);

    String getServiceCode();

    void setServiceCode(String serviceCode);

    void addAccount();

    boolean addSillyAccount();

    void addAccount(Account account, boolean vipFlag);

    boolean doWork();
}
