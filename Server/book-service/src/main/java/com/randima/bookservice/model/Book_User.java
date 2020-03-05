package com.randima.bookservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Book_User {
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
}
