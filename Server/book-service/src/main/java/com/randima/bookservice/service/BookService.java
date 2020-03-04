package com.randima.bookservice.service;

import com.randima.bookservice.model.Book;

import java.util.Optional;

public interface BookService {
    void saveBook(Book book);
    Optional<Book> findById(Integer id);
}
