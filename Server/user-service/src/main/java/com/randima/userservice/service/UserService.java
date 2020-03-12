package com.randima.userservice.service;

import com.randima.userservice.model.Book;
import com.randima.userservice.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    List<Book> getCurrentBook(Integer id);
    User getUserById(Integer id);
}
