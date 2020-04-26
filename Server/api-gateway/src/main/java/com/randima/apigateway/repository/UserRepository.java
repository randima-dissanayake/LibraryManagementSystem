package com.randima.apigateway.repository;

import com.randima.apigateway.model.LibUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<LibUser, Integer> {
    @Query(value = "SELECT * FROM LibUser u WHERE u.isDelete = false AND u.username = :username", nativeQuery = true)
    LibUser findByUsername(@Param("username") String username);
    LibUser findByUniversityId(Integer id);
}
