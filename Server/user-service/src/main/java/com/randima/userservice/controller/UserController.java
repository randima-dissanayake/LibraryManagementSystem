package com.randima.userservice.controller;

import com.randima.userservice.model.Book;
import com.randima.userservice.model.User;
import com.randima.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    UserService userService;

    @RequestMapping(value = "",method = RequestMethod.POST)
    public User saveUser(@RequestBody User transaction){
        return userService.saveUser(transaction);
    }

    @RequestMapping(value = "",method = RequestMethod.GET)
    public List<User> getAll(){
        return userService.getAll();
    }

    @RequestMapping(value = "/currentbooks/{id}",method = RequestMethod.GET)
    public List<Book> getBookList(@PathVariable Integer id){
        return userService.getCurrentBook(id);
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public User findById(@PathVariable Integer id){
        return userService.getUserById(id);
    }


}
