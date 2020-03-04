package com.randima.bookservice.service;

import com.randima.bookservice.model.Book;
import com.randima.bookservice.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookServiceImpl implements BookService{

    @Autowired
    BookRepository bookRepository;

    @Override
    public void saveBook(Book book) {
        bookRepository.save(book);
    }

    @Override
    public Optional<Book> findById(Integer id){
        return bookRepository.findById(id);
    }
}
