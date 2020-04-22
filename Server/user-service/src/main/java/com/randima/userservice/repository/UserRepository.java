package com.randima.userservice.repository;

import com.randima.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserEmail(String useremail);
    User findByUniversityId(Integer uId);
//    @Query("SELECT u FROM User u WHERE u.isDelete = false")
    List<User> findAll();
}
