package com.randima.transactionservice.service;

import com.randima.transactionservice.model.Book;
import com.randima.transactionservice.model.Transaction;
import com.randima.transactionservice.model.User;
import com.randima.transactionservice.repository.TransactionRepository;
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
public class TransactionServiceImpl implements TransactionService {
    @Autowired
    TransactionRepository transactionRepository;

    @Bean
    RestTemplate getRestTemplate(){
        return new RestTemplate();
    }

    @Autowired
    RestTemplate restTemplate;

    @Override
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Optional<Transaction> findById(Integer id) {
        return transactionRepository.findById(id);
    }

    @Override
    public List<Transaction> findByUserId(Integer id) {
        return transactionRepository.findByUserId(id);
    }

    @Override
    public List<Transaction> findByBookId(Integer id) {
        return transactionRepository.findByBookId(id);
    }

    @Override
    public List<Book> getCurrentBookListByUserId(Integer id) {
        List<Transaction> transactions = this.findByUserId(id);

        List<Book> booklist = new ArrayList<>();
        HttpHeaders httpHeaders=new HttpHeaders();
        HttpEntity<String> httpEntity=new HttpEntity<>("",httpHeaders);
        for (Transaction transaction:transactions){
            ResponseEntity<Book> responseEntity=restTemplate.exchange("http://localhost:8080/book/"+transaction.getBookId(),
                    HttpMethod.GET,httpEntity, Book.class);
            Book book=responseEntity.getBody();
            System.out.println("rrrrrrrrrrrrr"+book);
            booklist.add(book);
        }
        return booklist;
    }

    @Override//bookid 1t inna user list
    public List<User> getUserListByBookId(Integer id) {
        List<Transaction> transactions = this.findByBookId(id);

        List<User> userlist = new ArrayList<>();
        HttpHeaders httpHeaders=new HttpHeaders();
        HttpEntity<String> httpEntity=new HttpEntity<>("",httpHeaders);
        for (Transaction transaction:transactions){
            ResponseEntity<User> responseEntity=restTemplate.exchange("http://localhost:8181/user/"+transaction.getUserId(),
                    HttpMethod.GET,httpEntity, User.class);
            User user=responseEntity.getBody();
            System.out.println("rrrrrrrrrrrrr"+user);
            userlist.add(user);
        }




//        for (User user : users) {
//            System.out.println("rrrrrrrrrrrrr"+user);
//            user.setUser(this.getUserById(user.getId()));
//            userlist.add(user);
//        }
        return userlist;
    }
}
