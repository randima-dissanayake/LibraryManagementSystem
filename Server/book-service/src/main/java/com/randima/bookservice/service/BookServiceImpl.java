package com.randima.bookservice.service;

import com.randima.bookservice.model.Book;
import com.randima.bookservice.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;


public class BookServiceImpl implements BookService{

    @Autowired
    BookRepository bookRepository;

    @Override
    public void saveBook(Book book) {
        bookRepository.save(book);
    }
}
