package com.peterlimz.aopdemo.dao;

import com.peterlimz.aopdemo.Account;

public interface AccountDAO {

    void addAccount();

    boolean addSillyAccount();

    void addAccount(Account account, boolean vipFlag);

    boolean doWork();
}
