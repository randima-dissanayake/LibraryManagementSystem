package com.randima.userservice.service;

import com.randima.userservice.model.Book;
import com.randima.userservice.model.Telephone;
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
        for (Telephone telephone : user.getTelephones()) {
            telephone.setUser(user);
        }   
        return userRepository.save(user);
    }

    @Override//userId 1ta tiyna currernt books
    public List<Book> getCurrentBook(Integer userId) {
        HttpHeaders httpHeaders=new HttpHeaders();
        HttpEntity<String> httpEntity=new HttpEntity<>("",httpHeaders);
        ResponseEntity<Book[]> responseEntity=restTemplate.exchange("http://localhost:8081/transaction/user/currentbooks/"+userId,
                HttpMethod.GET,httpEntity,Book[].class);
        Book[] books=responseEntity.getBody();
        List<Book> booklist = new ArrayList<>();

        for (Book book : books) {
            booklist.add(book);
        }
        return booklist;
    }

    @Override
    public User getUserById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()){
            user.get().setCurrentBookList(this.getCurrentBook(id));
            return user.get();
        }
        return null;
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user){
        if (user.getId()!=0) {
            for (Telephone telephone : user.getTelephones()) {
                telephone.setUser(user);
            }
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    @Override
    public User getUserByUniversityId(Integer uId){
        return userRepository.findByUniversityId(uId);
    }

    @Override
    public User deleteUser(Integer uid){
        User user = userRepository.findByUniversityId(uid);
        if (user!= null){
            user.setDelete(true);
            return userRepository.save(user);
        }
        return null;
    }
}
