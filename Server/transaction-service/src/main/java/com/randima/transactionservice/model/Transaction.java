package com.randima.transactionservice.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
public class Transaction {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    private Integer bookId;
    private Integer universityId;
    private LocalDate checkin_date;
    private LocalDate checkout_date;
    private Integer renew_flag;
    private Integer fine;
    @Transient
    private User user;
    @Transient
    private Book book;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Integer getUniversityId() {
        return universityId;
    }

    public void setUniversityId(Integer userId) {
        this.universityId = userId;
    }

    public LocalDate getCheckout_date() {
        return checkout_date;
    }

    public void setCheckout_date(LocalDate checkout_date) {
        this.checkout_date = checkout_date;
    }

    public Integer getRenew_flag() {
        return renew_flag;
    }

    public void setRenew_flag(Integer renew_flag) {
        this.renew_flag = renew_flag;
    }

    public LocalDate getCheckin_date() {
        return checkin_date;
    }

    public void setCheckin_date(LocalDate checkin_date) {
        this.checkin_date = checkin_date;
    }

    public Integer getFine() {
        return fine;
    }

    public void setFine(Integer fine) {
        this.fine = fine;
    }

}
