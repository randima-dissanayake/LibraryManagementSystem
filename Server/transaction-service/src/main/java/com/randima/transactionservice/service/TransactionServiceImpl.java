package com.randima.transactionservice.service;

import com.randima.transactionservice.model.Book;
import com.randima.transactionservice.model.Transaction;
import com.randima.transactionservice.model.User;
import com.randima.transactionservice.repository.TransactionRepository;
import org.joda.time.DateTime;
import org.joda.time.Days;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;
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
        HttpHeaders httpHeaders=new HttpHeaders();
        HttpEntity<String> httpEntity=new HttpEntity<>("",httpHeaders);
        ResponseEntity<Book> responseEntity=restTemplate.exchange("http://localhost:8080/book/borrow/"+transaction.getBookId(),
                HttpMethod.GET,httpEntity, Book.class);
        transaction.setBook(responseEntity.getBody());
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction findById(Integer id) {
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if (transaction.isPresent()){
            return transaction.get();
        }
        return null;
    }

    @Override
    public List<Transaction> findByUniversityId(Integer id) {
        List<Transaction> transactions = new ArrayList<>();
        HttpHeaders httpHeaders=new HttpHeaders();
        HttpEntity<String> httpEntity=new HttpEntity<>("",httpHeaders);
        for (Transaction transaction: transactionRepository.findByUniversityId(id)){
            ResponseEntity<Book> book=restTemplate.exchange("http://localhost:8080/book/"+transaction.getBookId(),
                    HttpMethod.GET,httpEntity, Book.class);
            transaction.setBook(book.getBody());
            transaction.setFine(calculateFine(transaction));
            transactions.add(transaction);
        }
        return transactions;
    }

    @Override
    public List<Transaction> findByBookId(Integer id) {
        return transactionRepository.findByBookId(id);
    }

    @Override
    public List<Book> getCurrentBookListByUserId(Integer id) {
        List<Transaction> transactions = this.findByUniversityId(id);

        List<Book> booklist = new ArrayList<>();
        HttpHeaders httpHeaders=new HttpHeaders();
        HttpEntity<String> httpEntity=new HttpEntity<>("",httpHeaders);
        for (Transaction transaction:transactions){
            ResponseEntity<Book> responseEntity=restTemplate.exchange("http://localhost:8080/book/"+transaction.getBookId(),
                    HttpMethod.GET,httpEntity, Book.class);
            Book book=responseEntity.getBody();
            calculateFine(transaction);
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
            calculateFine(transaction);
            ResponseEntity<User> responseEntity=restTemplate.exchange("http://localhost:8181/user/"+transaction.getUniversityId(),
                    HttpMethod.GET,httpEntity, User.class);
            User user=responseEntity.getBody();
            userlist.add(user);
        }

        return userlist;
    }

    @Override
    public List<Transaction> findAll() {
        List<Transaction> transactions = new ArrayList<>();
        HttpHeaders httpHeaders=new HttpHeaders();
        HttpEntity<String> httpEntity=new HttpEntity<>("",httpHeaders);
        for (Transaction transaction: transactionRepository.findAll()){
            ResponseEntity<User> user=restTemplate.exchange("http://localhost:8181/user/uid/"+transaction.getUniversityId(),
                    HttpMethod.GET,httpEntity, User.class);
            transaction.setUser(user.getBody());
            ResponseEntity<Book> book=restTemplate.exchange("http://localhost:8080/book/"+transaction.getBookId(),
                    HttpMethod.GET,httpEntity, Book.class);
            transaction.setBook(book.getBody());
            transaction.setFine(calculateFine(transaction));
            transactions.add(transaction);
        }
        return transactions;
//        return transactionRepository.findAll();
    }

    @Override
    public Transaction updateTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    private Integer calculateFine(Transaction transaction){
        System.out.println("cal fine "+transaction);
//        if (transaction.getCheckout_date().compareTo(LocalDate.now())>0){
        DateTime from = new DateTime(Date.valueOf(transaction.getCheckout_date()));
        DateTime to = new DateTime(Date.valueOf(LocalDate.now()));
        if (Days.daysBetween(from,to).getDays()>0){
            updateFine(transaction);
            return 5*Days.daysBetween(from,to).getDays();
        }
        return 0;
    }

    private void updateFine(Transaction transaction){
        DateTime from = new DateTime(Date.valueOf(transaction.getCheckout_date()));
        DateTime to = new DateTime(Date.valueOf(LocalDate.now()));
        Integer dueDays = Days.daysBetween(from,to).getDays();
        transaction.setFine(dueDays* 5);
        transactionRepository.save(transaction);
    }

    @Override
    public Transaction returnBook(Integer id){
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if (transaction.isPresent()){
            HttpHeaders httpHeaders=new HttpHeaders();
            HttpEntity<String> httpEntity=new HttpEntity<>("",httpHeaders);
            ResponseEntity<Book> book=restTemplate.exchange("http://localhost:8080/book/return/"+transaction.get().getBookId(),
                    HttpMethod.GET,httpEntity, Book.class);
            transaction.get().setReturnedDate(LocalDate.now());
            transaction.get().setReturned(true);
            transaction.get().setBook(book.getBody());
            return transactionRepository.save(transaction.get());
        }
        return null;
    }

    @Override
    public Transaction renewTransaction(Integer id){
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if (transaction.isPresent()){
            HttpHeaders httpHeaders=new HttpHeaders();
            HttpEntity<String> httpEntity=new HttpEntity<>("",httpHeaders);
            ResponseEntity<Book> book=restTemplate.exchange("http://localhost:8080/book/renew/"+transaction.get().getBookId(),
                    HttpMethod.GET,httpEntity, Book.class);
            transaction.get().setCheckout_date(transaction.get().getCheckin_date().plusDays(21));
            transaction.get().setRenew_flag(1);
            transaction.get().setBook(book.getBody());
            return transactionRepository.save(transaction.get());
        }
        return null;
    }

    @Override
    public List<Transaction> getFineNotReturned(){
        List<Transaction> transactions = new ArrayList<>();
        HttpHeaders httpHeaders=new HttpHeaders();
        HttpEntity<String> httpEntity=new HttpEntity<>("",httpHeaders);
        for (Transaction transaction: transactionRepository.findAllFine()){
            ResponseEntity<User> user=restTemplate.exchange("http://localhost:8181/user/uid/"+transaction.getUniversityId(),
                    HttpMethod.GET,httpEntity, User.class);
            transaction.setUser(user.getBody());
            ResponseEntity<Book> book=restTemplate.exchange("http://localhost:8080/book/"+transaction.getBookId(),
                    HttpMethod.GET,httpEntity, Book.class);
            transaction.setBook(book.getBody());
            transaction.setFine(calculateFine(transaction));
            transactions.add(transaction);
        }
        return transactions;
//        return transactionRepository.findAllFine();
    }
}
