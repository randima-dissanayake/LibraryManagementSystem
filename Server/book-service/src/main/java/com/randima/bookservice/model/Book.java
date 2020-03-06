package com.randima.bookservice.model;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Entity
@Data
public class Book {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    private String title;
    private String author;
    private String publisher;
    private String year_of_publication;
    private String location;
    private Integer num_of_copies;
    private String last_available_date;

//    private byte[] coverageImage;
    @OneToMany(mappedBy = "book", cascade = {CascadeType.REMOVE})
    List<Transaction> currentUsers = new ArrayList<Transaction>();

    @Autowired
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable
            (
                    joinColumns = {@JoinColumn(name = "book_id", referencedColumnName = "id")},
                    inverseJoinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)}
            )
    private List<User> waitUsers = new LinkedList<User>();

    public Book(String author, String title, String publisher, String year_of_publication, String location, int num_of_copies) {
        this.author = author;
        this.title = title;
        this.publisher = publisher;
        this.year_of_publication = year_of_publication;
        this.location = location;
        this.num_of_copies = num_of_copies;
        this.last_available_date = null;

    }

    public Book() {
    }
}
