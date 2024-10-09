package com.peterlimz.aopdemo.dao;

import org.springframework.stereotype.Repository;

@Repository
public class MembershipDAOImpl implements MembershipDAO {

    @Override
    public void addAccount() {
        System.out.println(getClass() + ": DOING DB WORK: ADDING A MEMBERSHIP ACCOUNT");

    }
}
