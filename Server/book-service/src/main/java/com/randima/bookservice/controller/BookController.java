package com.randima.bookservice.controller;

import com.randima.bookservice.model.Book;
import com.randima.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    BookService bookService;

    @RequestMapping(value = "",method = RequestMethod.POST)
    public void saveBook(@RequestBody Book book){
        bookService.saveBook(book);
        System.out.println("save book");
    }

}
