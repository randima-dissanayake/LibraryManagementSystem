package com.randima.bookservice.repository;

import com.randima.bookservice.model.Book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface BookRepository extends JpaRepository<Book,Integer> {
    @Query(value = "SELECT * FROM Book u WHERE u.isDelete = false",nativeQuery = true)
    List<Book> findAll();

}
