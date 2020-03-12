package com.randima.bookservice.service;

import com.randima.bookservice.model.Book;
import com.randima.bookservice.model.BookCopy;
import com.randima.bookservice.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookServiceImpl implements BookService{

    @Autowired
    BookRepository bookRepository;

    @Override
    public Book saveBook(Book book) {
//        for (BookCopy bookCopy: book.getBookCopies()){
//            bookCopy.setBook(book);
//        }
        return bookRepository.save(book);
    }

    @Override
    public Optional<Book> findById(Integer id){
        return bookRepository.findById(id);
    }

    //need to change
    @Override
    public Book updateBook(Integer id, Book book) {
        return bookRepository.save(book);
    }
}
