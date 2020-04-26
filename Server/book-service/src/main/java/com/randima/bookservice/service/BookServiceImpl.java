package com.randima.bookservice.service;

import com.randima.bookservice.model.Book;
import com.randima.bookservice.model.User;
import com.randima.bookservice.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService{

    @Autowired
    BookRepository bookRepository;

    @Bean
    RestTemplate getRestTemplate(){
        return new RestTemplate();
    }

    @Autowired
    RestTemplate restTemplate;

    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book findById(Integer id){

        Optional<Book> book = bookRepository.findById(id);
        if (book.isPresent()){
            return book.get();
        }
        return null;
    }

    //need to change
    @Override
    public Book updateBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public List<User> getUserList(Integer bookId) {
        HttpHeaders httpHeaders=new HttpHeaders();
        HttpEntity<String> httpEntity=new HttpEntity<>("",httpHeaders);
        ResponseEntity<User[]> responseEntity=restTemplate.exchange("http://localhost:8081/transaction/book/currentusers/"+bookId,
                HttpMethod.GET,httpEntity,User[].class);
        User[] users=responseEntity.getBody();
        List<User> userlist = new ArrayList<>();

        for (User user : users) {
            userlist.add(user);
        }
        return userlist;
    }

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public Book borrowBook(Integer id){
        Optional<Book> book = bookRepository.findById(id);
        if (book.isPresent()) {
            book.get().setLast_available_date(LocalDate.now().plusDays(14));
            book.get().setEnabled(false);
            return bookRepository.save(book.get());
        } else {
            return null;
        }
    }

    @Override
    public Book returnBook(Integer id){
        Optional<Book> book = bookRepository.findById(id);
        if (book.isPresent()) {
            book.get().setLast_available_date(null);
            book.get().setEnabled(true);
            return bookRepository.save(book.get());
        } else {
            return null;
        }
    }
    @Override
    public Book renewTransaction(Integer id){
        Optional<Book> book = bookRepository.findById(id);
        if (book.isPresent()) {
            book.get().setLast_available_date(book.get().getLast_available_date().plusDays(7));
            book.get().setEnabled(false);
            return bookRepository.save(book.get());
        } else {
            return null;
        }
    }
    @Override
    public Book deleteBook(Integer id){
        Optional<Book> book = bookRepository.findById(id);
        if (book.isPresent()){
            book.get().setDelete(true);
            return bookRepository.save(book.get());
        }
        return null;
    }
}
