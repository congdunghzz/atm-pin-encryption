package com.congdunghzz.atm.repository;


import com.congdunghzz.atm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<com.congdunghzz.atm.model.User, Integer> {
    Optional<User> findByAccountNumber(String accountNumber);
}
