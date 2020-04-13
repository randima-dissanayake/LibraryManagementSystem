package com.randima.apigateway.repository;

import com.randima.apigateway.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}
