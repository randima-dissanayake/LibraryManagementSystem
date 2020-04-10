package com.randima.bookservice.service;

import com.randima.bookservice.model.Book;
import com.randima.bookservice.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface BookService {
    Book saveBook(Book book);
    Book findById(Integer id);
    Book updateBook(Book book);
    List<User> getUserList(Integer id);
    List<Book> findAll();
}
