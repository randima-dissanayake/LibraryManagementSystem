package com.randima.bookservice.controller;

import com.randima.bookservice.model.Book;
import com.randima.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public Optional<Book> findById(@PathVariable Integer id){
        return bookService.findById(id);
    }

}
