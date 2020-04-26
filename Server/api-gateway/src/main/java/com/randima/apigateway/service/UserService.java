package com.randima.apigateway.service;

import com.randima.apigateway.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserService {
    @Bean
    RestTemplate getRestTemplate(){
        return new RestTemplate();
    }

    @Autowired
    private RestTemplate restTemplate;

    public User saveInUserService(User user, String token){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.add("Authorization","Bearer "+token);
        HttpEntity<User> request = new HttpEntity<>(user,httpHeaders);
//        ResponseEntity<User> response = restTemplate
//                .exchange("http://localhost:8082/user", HttpMethod.POST, request, User.class);
        ResponseEntity<User> response = restTemplate
                .exchange("http://192.168.8.101:8181/user", HttpMethod.POST, request, User.class);
        return response.getBody();
    }

    public User deleteUser(Integer uid){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders=new HttpHeaders();
        HttpEntity<String> request = new HttpEntity<>("",httpHeaders);
//        ResponseEntity<User> response = restTemplate
//                .exchange("http://localhost:8082/user", HttpMethod.POST, request, User.class);
        ResponseEntity<User> response = restTemplate
                .exchange("http://192.168.8.101:8181/user/delete/"+uid, HttpMethod.DELETE, request, User.class);
        return response.getBody();
    }

}
