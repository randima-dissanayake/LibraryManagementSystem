package com.randima.userservice.service;

import com.randima.userservice.model.Book;
import com.randima.userservice.model.User;
import com.randima.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Bean
    RestTemplate getRestTemplate(){
        return new RestTemplate();
    }

    @Autowired
    RestTemplate restTemplate;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override//userId 1ta tiyna currernt books
    public List<Book> getCurrentBook(Integer userId) {
        HttpHeaders httpHeaders=new HttpHeaders();
        HttpEntity<String> httpEntity=new HttpEntity<>("",httpHeaders);
        ResponseEntity<Book[]> responseEntity=restTemplate.exchange("http://localhost:8081/transaction/user/currentbooks/"+userId,
                HttpMethod.GET,httpEntity,Book[].class);
        Book[] books=responseEntity.getBody();
        System.out.println("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"+books);
        List<Book> booklist = new ArrayList<>();

        for (Book book : books) {
            System.out.println("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"+book);
            book.setUser(this.getUserById(book.getId()));
            booklist.add(book);
        }
        return booklist;
    }


//    public Optional<User> getUserById(Integer id){
//        return userRepository.findById(id);
//    }

    @Override
    public User getUserById(Integer id) {
        Optional<User> users = userRepository.findById(id);
        if (users.isPresent())
            return users.get();
        return null;
    }
}
