package com.randima.userservice.controller;

import com.randima.userservice.model.Book;
import com.randima.userservice.model.User;
import com.randima.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")

public class UserController {
    @Autowired
    UserService userService;

//    @RequestMapping(value = "",method = RequestMethod.POST)
//    public User saveUser(@RequestBody User user){
//        return userService.saveUser(user);
//    }

    @RequestMapping(value = "",method = RequestMethod.GET)
    public List<User> getAll(@RequestHeader HttpHeaders headers){
        System.out.println("tttttttttt "+headers.getContentType());
        return userService.getAll();
    }

    @RequestMapping(value = "",method = RequestMethod.PUT)
    public User updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }

//    @RequestMapping(value = "/user",method = RequestMethod.GET)
//    public ResponseEntity<?> getAll(){
//        return ResponseEntity.ok(userService.getAll());
//    }

    @RequestMapping(value = "/currentbooks/{id}",method = RequestMethod.GET)
    public List<Book> getBookList(@PathVariable Integer id){
        return userService.getCurrentBook(id);
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public User findById(@PathVariable Integer id){
        return userService.getUserById(id);
    }

}
