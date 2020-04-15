package com.randima.bookservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.randima.bookservice.model.Book;
import com.randima.bookservice.model.User;
import com.randima.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("")
public class BookController {

    @Autowired
    BookService bookService;
    @Autowired
    ServletContext servletContext;

    @RequestMapping(value = "",method = RequestMethod.POST)
    public Book saveBook(@RequestParam("file") MultipartFile file, @RequestParam("book") String book) throws IOException {
        Book book_new = new ObjectMapper().readValue(book, Book.class);
        book_new.setBook_image((file.getBytes()));
        book_new.setFile_name(file.getOriginalFilename());
        System.out.println("eeee"+book_new);
//
//        boolean isExist= new File(servletContext.getRealPath("/bookprofile")).exists();
//        if (!isExist){
//            new File(servletContext.getRealPath("/bookprofile")).mkdir();
//        }
//        book_new.setFileName(file.getOriginalFilename())
        return bookService.saveBook(book_new);
    }

    @RequestMapping(value = "",method = RequestMethod.GET)
    public List<Book> findAll(){
        return bookService.findAll();
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public Book findById(@PathVariable Integer id){
        return bookService.findById(id);
    }

    @RequestMapping(value = "",method = RequestMethod.PUT)
    public Book updateBook(@RequestBody Book book){
        return bookService.updateBook(book);
    }

    @RequestMapping(value = "/currentusers/{id}",method = RequestMethod.GET)
    public List<User> getUserList(@PathVariable Integer id){
        return bookService.getUserList(id);
    }

}
