package com.randima.bookservice.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
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
//    private String last_available_date;
    @Transient
    List<Transaction> currentUsers = new ArrayList<Transaction>();

//    @Transient
//    private List<User> waitUsers = new LinkedList<User>();

    @OneToMany(cascade = CascadeType.ALL, targetEntity = BookCopy.class, mappedBy = "book")
    List<BookCopy> bookCopies;

    public Book(String author, String title, String publisher, String year_of_publication, String location, int num_of_copies) {
        this.author = author;
        this.title = title;
        this.publisher = publisher;
        this.year_of_publication = year_of_publication;
        this.location = location;
        this.num_of_copies = num_of_copies;
//        this.last_available_date = null;

    }

    public Book() {
    }

    public List<BookCopy> getBookCopies() {
        return bookCopies;
    }

    public void setBookCopies(List<BookCopy> bookCopies) {
        this.bookCopies = bookCopies;
    }
}
