package com.peterlimz.aopdemo.dao;

import com.peterlimz.aopdemo.Account;
import org.springframework.stereotype.Repository;

@Repository
public class AccountDAOImpl implements AccountDAO {

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
}
