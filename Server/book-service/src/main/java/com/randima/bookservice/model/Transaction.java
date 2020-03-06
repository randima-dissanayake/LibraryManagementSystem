package com.randima.bookservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class Transaction {
    @Id
    private Integer id;
    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private Book book;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    private String checkout_date;
    private Integer renew_flag;
    private Integer fine;

//    public Book_User() {
//
//    }

//    public Book_User(Book b, User u, LocalDateTime f, Integer renewFlag) {
////         create primary key
//
//        // initialize attributes
//        this.book = b;
//        this.user = u;
//        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
//        this.checkout_date = dtf.format(f);
//        this.renew_flag = renewFlag;
//        this.fine = 0;
//
//    }
}
