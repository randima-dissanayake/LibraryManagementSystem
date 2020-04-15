package com.randima.apigateway.repository;

import com.randima.apigateway.model.LibUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<LibUser, Integer> {
    LibUser findByUsername(String username);
}
