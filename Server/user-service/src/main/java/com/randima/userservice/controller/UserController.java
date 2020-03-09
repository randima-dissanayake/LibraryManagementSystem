package com.randima.userservice.controller;

import com.randima.userservice.model.User;
import com.randima.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @RequestMapping(value = "",method = RequestMethod.POST)
    public User saveTransaction(@RequestBody User transaction){
        return userService.saveUser(transaction);
    }


}
