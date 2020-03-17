package com.randima.bookservice.controller;

import com.randima.bookservice.model.Book;
import com.randima.bookservice.model.User;
import com.randima.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/book")
@CrossOrigin("*")
public class BookController {

    @Autowired
    BookService bookService;

    @RequestMapping(value = "",method = RequestMethod.POST)
    public Book saveBook(@RequestBody Book book){
        return bookService.saveBook(book);
    }

    @RequestMapping(value = "",method = RequestMethod.GET)
    public List<Book> findAll(){
        return bookService.findAll();
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public Book findById(@PathVariable Integer id){
        return bookService.findById(id);
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.PUT)
    public Book updateBook(@PathVariable Integer id, @RequestBody Book book){
        return bookService.updateBook(id,book);
    }

    @RequestMapping(value = "/currentusers/{id}",method = RequestMethod.GET)
    public List<User> getUserList(@PathVariable Integer id){
        return bookService.getUserList(id);
    }

}
